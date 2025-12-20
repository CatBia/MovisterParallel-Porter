import { NextRequest, NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';
import { productClient, promisify } from '@/lib/grpc-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await promisify(
      productClient,
      'GetProduct',
      { id: params.id }
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    const status = error.code === grpc.status.NOT_FOUND ? 404 : 500;
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status }
    );
  }
}

