import { NextRequest, NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';
import { orderClient, promisify } from '@/lib/grpc-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await promisify(
      orderClient,
      'GetOrder',
      { id: params.id }
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching order:', error);
    const status = error.code === grpc.status.NOT_FOUND ? 404 : 500;
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updateOrderRequest = {
      id: params.id,
      items: body.items || [],
      total: body.total || 0,
      status: body.status || '',
    };

    const response = await promisify(
      orderClient,
      'UpdateOrder',
      updateOrderRequest
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await promisify(
      orderClient,
      'DeleteOrder',
      { id: params.id }
    );

    return NextResponse.json({ success: (response as any).success || true });
  } catch (error: any) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

