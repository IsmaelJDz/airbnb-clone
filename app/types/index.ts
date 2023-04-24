import { User, Listing, Reservation } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeReservations = Omit<
  Reservation,
  'createdAt' | 'updatedAt' | 'endDate' | 'startDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  updatedAt: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
