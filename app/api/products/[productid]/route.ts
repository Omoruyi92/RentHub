export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import { adminMiddleware } from '@/app/middleware/authMiddleware';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productid: string }> }
) {
  const { productid } = await params;
  try {
    await dbConnect();
    const product = await Product.findById(productid);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ productid: string }> }
) {
  const { productid } = await params;
  const middlewareResponse = await adminMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    await dbConnect();
    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(productid, body, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productid: string }> }
) {
  const { productid } = await params;
  const middlewareResponse = await adminMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    await dbConnect();
    const deletedProduct = await Product.findByIdAndDelete(productid);
    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
