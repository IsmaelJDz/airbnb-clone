import React from 'react';

const UserMenu = () => {
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div className='hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100'>
          Airbnb your home
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
