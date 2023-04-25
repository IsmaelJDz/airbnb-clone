import React from 'react';

import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrenUser';
import getFavorites from '../actions/getFavorites';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const favorites = await getFavorites();
  const currentUser = await getCurrentUser();

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorites listings'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        favorites={favorites}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
