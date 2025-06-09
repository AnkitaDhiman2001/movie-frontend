import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Civvy . All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          Powered by Ankita
        </p>
      </div>
    </footer>
  );
};

export default Footer;