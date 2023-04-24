import prisma from '@/app/libs/prismadb';

interface IPrams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IPrams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      //Object.assign(query, { listingId });
      query['listingId'] = listingId;
    }

    if (userId) {
      //Object.assign(query, { userId });
      query['userId'] = userId;
    }

    if (authorId) {
      //Object.assign(query, { authorId });
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map(reservation => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
