import { NextRequest, NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';
import { productClient, promisify } from '@/lib/grpc-client';

export async function GET(request: NextRequest) {
  try {
    const response = await promisify(
      productClient,
      'GetProducts',
      {}
    );

    // Convert gRPC response to JSON format
    const products = (response as any).products || [];
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    const status = error.code === grpc.status.NOT_FOUND ? 404 : 500;
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status }
    );
  }
}

