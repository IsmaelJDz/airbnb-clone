'use client';

import React, { useEffect } from 'react';
import EmptyState from './components/EmptyState';

interface ErrorPageProps {
  error: Error;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <EmptyState title='Uh Oh' subtitle='Something went wrong!' />
  );
};

export default ErrorPage;
