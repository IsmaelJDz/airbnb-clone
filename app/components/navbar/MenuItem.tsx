'use client';
import React from 'react';

interface MenuItemsProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemsProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className='px-4 py-3 transition hover:bg-neutral-100'>
      {label}
    </div>
  );
};

export default MenuItem;
