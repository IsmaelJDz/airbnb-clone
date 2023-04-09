'use client';
import React, { useCallback, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='
          hidden
          px-4
          py-3
          text-sm
          font-semibold
          transition
          rounded-full
          cursor-pointer
          md:block
        hover:bg-neutral-100'>
          Airbnb your home
        </div>
        <div
          className='
          p-4 md:py-1 md:px-2 border-[1px]
          border-neutral-200 flex
          flex-row items-center gap-3
          rounded-full cursor-pointer
          hover:shadow-md
          transition
          '
          onClick={toggleMenu}>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className='absolute rounded-xl shadow-sm
            w-[40vw] md:w-3/4 bg-white overflow-hidden
            top-12 right-0 text-sm
          '>
          <div className='flex flex-col cursor-pointer'>
            <>
              <MenuItem onClick={() => {}} label='Login' />
              <MenuItem
                onClick={registerModal.onOpen}
                label='Sign up'
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
