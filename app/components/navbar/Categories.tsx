'use client';

import React from 'react';

import { IoDiamond } from 'react-icons/io5';
import { BsSnow } from 'react-icons/bs';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';

import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'Find your perfect beach vacation',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'Find your perfect windmill vacation',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'Find your perfect modern vacation',
  },
  {
    label: 'CountrySide',
    icon: TbMountain,
    description: 'Find your perfect countryside vacation',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'Find your perfect pool vacation',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'Find your perfect island vacation',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'Find your perfect lake vacation',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'Find your perfect castle vacation',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property has arctic activities',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is in a cave',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the barn',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();

  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='flex flex-row items-center justify-between pt-4 overflow-x-auto'>
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
