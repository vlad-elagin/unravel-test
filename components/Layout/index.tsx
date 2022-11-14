import React from 'react';
import Image from 'next/image';

import Logo from '@public/Logo.svg';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header>
        <Image src={Logo} alt="Classify Logo" />
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
