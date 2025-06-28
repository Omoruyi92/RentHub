/* eslint-disable @typescript-eslint/no-unused-vars */
export const runtime = 'nodejs';

import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import { adminMiddleware } from '@/app/middleware/authMiddleware';

const GET = async (_request: NextRequest, { params }: { params: { productid: string; }; }) => {
  const { productid } = params;
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
};

const PUT = async (request: NextRequest, { params }: { params: { productid: string } }) => {
  const middlewareResponse = await adminMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  const { productid } = params;
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
};

const DELETE = async (request: NextRequest, { params }: { params: { productid: string } }) => {
  const middlewareResponse = await adminMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  const { productid } = params;
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
};

export { GET, PUT, DELETE };
