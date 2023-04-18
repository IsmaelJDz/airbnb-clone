'use client';

import React, { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../navbar/Heading';
import Input from '../Inputs/Input';
import Button from '../Button';

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(callback => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();

        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome back'
        subtitle='Login to your account'
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
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className='cursor-pointer text-neutral-800 hover:underline'>
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel='Continue'
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Login'
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
