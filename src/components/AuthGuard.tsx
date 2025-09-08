"use client";

import React, { useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import { usePathname, useRouter } from 'next/navigation';
import Loader from './Loader';

const publicPaths = [
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
];


const authRoutes = [
  '/auth/login',
  '/auth/signup',
];

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return; 
    }

    // const pathIsPublic = publicPaths.includes(pathname);
    // const pathIsAuthRoute = authRoutes.includes(pathname);

    // if (!currentUser && !pathIsPublic) {
    //   router.push('/auth/login');
    // } else if (currentUser && pathIsAuthRoute) {
    //   router.push('/');
    // }
  }, [currentUser, loading, pathname, router]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Loader />
        </div>
    );
  }

  // if (!currentUser && !publicPaths.includes(pathname)) {
  //   return (
  //      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
  //                      <Loader />
  //     </div>
  //   );
  // }


  return <>{children}</>
};

export default AuthGuard;