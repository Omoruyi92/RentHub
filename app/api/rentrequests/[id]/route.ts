import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import RentRequest from '@/app/models/RentRequest';
import { adminMiddleware } from '@/app/middleware/authMiddleware';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();

  const isAdmin = await adminMiddleware(request);
  if (isAdmin) return isAdmin;

  if (!id) {
    return NextResponse.json({ error: 'Missing request ID' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status value' }, { status: 400 });
    }

    const updated = await RentRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Rent request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Something went wrong while updating the rent request.' }, { status: 500 });
  }
}
