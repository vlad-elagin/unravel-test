import clsx from 'clsx';
import React from 'react';
import { MdSearch } from 'react-icons/md';

const Searchbar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx(className, 'mx-auto flex w-full max-w-[545px]')}>
      <input className="[color: rgba(0,0,0,0.87)] h-12 grow rounded-full bg-_grey px-6 text-xl tracking-wide" />
      <button className="ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-_violet">
        <MdSearch className="text-white" size="32px" />
      </button>
    </div>
  );
};

export default Searchbar;
