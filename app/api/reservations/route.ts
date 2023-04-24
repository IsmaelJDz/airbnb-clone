import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrenUser';

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    //return NextResponse.redirect('/login')
    return NextResponse.error();
  }

  const { listingId, startDate, endDate, totalPrice } =
    await request.json();

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: user.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
