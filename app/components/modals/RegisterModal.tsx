'use client';
import React, { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../navbar/Heading';
import Input from '../Inputs/Input';
import Button from '../Button';
import LoginModal from './LoginModal';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch(error => {
        toast.error(
          'Something went wrong. Please try again later.',
          error
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome to Airbnb'
        subtitle='Create an account'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className='cursor-pointer text-neutral-800 hover:underline'>
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel='Continue'
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Register'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
