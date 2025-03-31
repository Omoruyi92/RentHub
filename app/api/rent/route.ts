import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import RentRequest from '@/app/models/RentRequest';
import { adminMiddleware } from '@/app/middleware/authMiddleware';

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  const {
    productId,
    name,
    email,
    phone,
    address,
    days,
    total,
  } = body;

  if (!productId || !name || !email || !phone || !address || !days || !total) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const newRequest = await RentRequest.create({
    productId,
    name,
    email,
    phone,
    address,
    days,
    total,
  });

  return NextResponse.json(newRequest, { status: 201 });
}

export async function GET(request: Request) {
  const auth = await adminMiddleware(request);
  if (auth) return auth;

  await dbConnect();
  const requests = await RentRequest.find().sort({ createdAt: -1 });
  return NextResponse.json(requests);
}
