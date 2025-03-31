import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import { adminMiddleware } from '@/app/middleware/authMiddleware';

// GET remains public
export async function GET(request: Request, { params }: { params: { productid: string } }) {
  await dbConnect();
  const product = await Product.findById(params.productid);
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT requires admin access
export async function PUT(request: Request, { params }: { params: { productid: string } }) {
  // Check admin authorization
  const middlewareResponse = await adminMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  await dbConnect();
  const body = await request.json();
  const updatedProduct = await Product.findByIdAndUpdate(params.productid, body, { new: true });
  if (!updatedProduct) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(updatedProduct);
}

// DELETE requires admin access
export async function DELETE(request: Request, { params }: { params: { productid: string } }) {
  // Check admin authorization
  const middlewareResponse = await adminMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  await dbConnect();
  const deletedProduct = await Product.findByIdAndDelete(params.productid);
  if (!deletedProduct) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Product deleted successfully' });
}