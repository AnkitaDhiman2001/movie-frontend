"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useForgetPasswordMutation } from '@/redux/services/authApi';
import { useAuth } from '@/context/AuthContext';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const [forgetPassword, { isLoading: isLoading, error: isError }] = useForgetPasswordMutation();

  const {redirectTo} = useAuth(); 

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
     try {
        if (!email) {
          alert('Please enter your email address.');
          return;
        }
        const res = await forgetPassword({ email }).unwrap();
        alert('Password reset link sent to your email!');
        if(res){
          redirectTo('/auth/login'); 
        }
      } catch (err) {
        console.error('Register failed');
        isError && alert('Error sending reset link. Please try again.');
      }
  };

  return (
     <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-[url(/images/moviebg2.jpg)] dark:bg-gray-900 px-4" >
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Forgot Your Password?
        </h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          No problem! Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Remember your password?{' '}
          <Link href="/auth/login" legacyBehavior>
            <a className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Back to Login
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;