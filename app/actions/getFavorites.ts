import prisma from '@/app/libs/prismadb';

import getCurrentUser from './getCurrenUser';

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map(favorite => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
      updatedAt: favorite.updatedAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
