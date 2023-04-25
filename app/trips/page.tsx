import React from 'react';
import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrenUser';
import getReservations from '../actions/getReservations';
import ClientOnly from '../components/ClientOnly';
import TripsClient from './TripsClient';

const TripsPage = async () => {
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

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No Trips'
          subtitle='You have not booked any trips.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default TripsPage;
