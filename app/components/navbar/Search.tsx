'use client';
import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();

  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestsCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue)
      return getByValue(locationValue as string)?.label;

    return 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} days`;

      // const days =
      //   (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      // return `${days} days`;
    }

    return 'Any week';
  }, [startDate, endDate]);

  const guestsLabel = useMemo(() => {
    if (guestsCount) {
      return `${guestsCount} guests`;
    }

    return 'Add guests';
  }, [guestsCount]);

  // const guestLabel = useMemo(() => {
  //   if (guestCount) {
  //     return `${guestCount} Guests`;
  //   }

  //   return 'Add Guests';
  // }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className='
    border-[1px]
    w-full
    md:w-auto
    py-2
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
  '>
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm front-semibold'>
          {locationLabel}
        </div>
        <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
          {durationLabel}
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='hidden sm:block'> {guestsLabel} </div>
          <div className='p-2 text-white rounded-full bg-rose-500'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
