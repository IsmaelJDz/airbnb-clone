import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrenUser';

export async function POST(request: Request) {
  const currencyUser = await getCurrentUser();

  if (!currencyUser) {
    //return NextResponse.redirect('/login');
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach(value => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currencyUser.id,
    },
  });

  //return NextResponse.redirect(`/listings/${listing.id}`);
  return NextResponse.json(listing);
}
