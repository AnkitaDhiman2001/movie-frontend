"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; 
import Loader from './Loader';
// import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout, loading } = useAuth(); 
  // const router = useRouter();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout(); 
    setIsMobileMenuOpen(false); 
  };

  if (loading) {
    return ( 
      <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/" legacyBehavior><a className="hover:text-gray-300">Civvy </a></Link>
          </div>
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <Loader />
              </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-300">Civvy </a>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" legacyBehavior><a className="hover:text-gray-300">Home</a></Link>
          <Link href="/movies" legacyBehavior><a className="hover:text-gray-300">Movies</a></Link>
          <Link href="/tv-shows" legacyBehavior><a className="hover:text-gray-300">TV Shows</a></Link>
          <Link href="/search" legacyBehavior><a className="hover:text-gray-300">Search</a></Link>
          
          {!loading && (
            currentUser ? (
              <>
                <span className="text-sm text-gray-300 hidden lg:inline">Welcome, {currentUser.email}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" legacyBehavior>
                  <a className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Login</a>
                </Link>
                <Link href="/auth/signup" legacyBehavior>
                  <a className="text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">Sign Up</a>
                </Link>
              </>
            )
          )}
        </nav>

        <div className="md:hidden flex items-center">
         {!loading && currentUser && (
            <span className="text-xs text-gray-400 mr-2 truncate max-w-[100px] sm:max-w-[150px] hidden sm:inline">
              {currentUser.email}
            </span>
          )}
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <nav className="flex flex-col items-stretch space-y-1 px-2 py-3">
            <Link href="/" legacyBehavior><a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600">Home</a></Link>
            <Link href="/movies" legacyBehavior><a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600">Movies</a></Link>
            <Link href="/tv-shows" legacyBehavior><a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600">TV Shows</a></Link>
            <Link href="/search" legacyBehavior><a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600">Search</a></Link>
            
            <hr className="my-2 border-gray-600" />

            {!loading && ( 
              currentUser ? (
                <>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600 text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" legacyBehavior>
                    <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600">Login</a>
                  </Link>
                  <Link href="/auth/signup" legacyBehavior>
                    <a onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-600">Sign Up</a>
                  </Link>
                </>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;