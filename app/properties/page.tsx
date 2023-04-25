import React from 'react';
import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrenUser';
import ClientOnly from '../components/ClientOnly';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='UnAuthorized'
          subtitle='Please login to view your trips.'
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found'
          subtitle='Looks like you have not properties yet.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default PropertiesPage;
