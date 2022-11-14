import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import Logo from '@public/Logo.svg';
import Searchbar from '@components/Searchbar';

const Layout: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx(className, 'min-h-screen px-4 pt-8 lg:px-8 lg:pt-20')}>
      <header className="flex justify-center">
        <Image src={Logo} alt="Classify Logo" />
      </header>

      <main className="mt-4 font-sans lg:mt-8">
        <Searchbar className="mb-8 lg:mb-20" />

        {children}
      </main>
    </div>
  );
};

export default Layout;
