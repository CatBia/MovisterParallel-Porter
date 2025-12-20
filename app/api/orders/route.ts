import { NextRequest, NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';
import { orderClient, promisify } from '@/lib/grpc-client';

export async function GET(request: NextRequest) {
  try {
    const response = await promisify(
      orderClient,
      'GetOrders',
      {}
    );

    // Convert gRPC response to JSON format
    const orders = (response as any).orders || [];
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    const status = error.code === grpc.status.NOT_FOUND ? 404 : 500;
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const createOrderRequest = {
      items: body.items || [],
      total: body.total || 0,
    };

    const response = await promisify(
      orderClient,
      'CreateOrder',
      createOrderRequest
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

