'use client';

import React from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/navbar/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavoritesClientProps {
  favorites: SafeListing[];
  currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <div className='grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {favorites.map(listing => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
