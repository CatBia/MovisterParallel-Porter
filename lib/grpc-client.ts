import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(process.cwd(), 'proto');
const GRPC_SERVER = process.env.GRPC_SERVER || process.env.BACKEND_URL?.replace('http://', '').replace('https://', '') || 'localhost:8082';

// Load protobuf definitions
const productPackageDefinition = protoLoader.loadSync(
  path.join(PROTO_PATH, 'products.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const orderPackageDefinition = protoLoader.loadSync(
  path.join(PROTO_PATH, 'orders.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const productProto = grpc.loadPackageDefinition(productPackageDefinition) as any;
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition) as any;

// Create gRPC clients
export const productClient = new productProto.products.ProductService(
  GRPC_SERVER,
  grpc.credentials.createInsecure()
);

export const orderClient = new orderProto.orders.OrderService(
  GRPC_SERVER,
  grpc.credentials.createInsecure()
);

// Helper function to promisify gRPC calls
export function promisify<T>(
  client: any,
  method: string,
  request: any
): Promise<T> {
  return new Promise((resolve, reject) => {
    client[method](request, (error: grpc.ServiceError | null, response: T) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

