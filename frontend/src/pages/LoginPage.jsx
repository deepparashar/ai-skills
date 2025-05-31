import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { CgProfile } from 'react-icons/cg';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + '/api/auth/signup', {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token); //
          navigate('/profile');
          toast.success(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', {
          email,
          password,
        });

        if (data.success) {
          navigate('/profile');
          toast.success(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='fixed top-0 right-0 left-0 bottom-0 z-10 flex justify-center items-center'>
        <AnimatePresence mode='wait'>
          <motion.form
            onSubmit={handleOnSubmit}
            key={state}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className='relative bg-white/10 p-10 rounded-xl border text-white w-[320px]'
          >
            <h1 className='text-center text-2xl text-white font-medium mb-2'>
              {state}
            </h1>
            <p className='text-sm'>
              {state === 'Login'
                ? `Welcome back! ${state} to continue`
                : `Welcome to AIMentor ${state} to continue`}
            </p>

            {state === 'Sign up' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'
              >
                <CgProfile width={20} className='mr-2' />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type='text'
                  placeholder='Full Name'
                  required
                  className='outline-none text-sm bg-transparent w-full'
                />
              </motion.div>
            )}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
              <MdEmail width={20} className='mr-2' />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder='Email id'
                required
                className='outline-none text-sm bg-transparent w-full'
              />
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
              <RiLockPasswordLine width={20} className='mr-2' />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
                required
                className='outline-none text-sm bg-transparent w-full'
              />
            </div>

            <button
              type='submit'
              className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'
            >
              {state === 'Login' ? 'Login' : 'Sign up'}
            </button>

            {state === 'Login' ? (
              <p className='mt-5 text-center'>
                Don't have an account?{' '}
                <span
                  className='text-blue-600 cursor-pointer'
                  onClick={() => setState('Sign up')}
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p className='mt-5 text-center'>
                Already have an account?{' '}
                <span
                  className='text-blue-600 cursor-pointer'
                  onClick={() => setState('Login')}
                >
                  Login
                </span>
              </p>
            )}
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;
