import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface HeaderLayoutProps {
  title: string;
  buttonLabel: string;
  buttonLink: string;
  buttonClassName?: string;
}

const PageLayout: React.FC<HeaderLayoutProps> = ({
  title,
  buttonLabel,
  buttonLink,
  buttonClassName = "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
}) => {
  return (
    <div className="flex justify-between items-center pb-2">
      <h1 className="text-2xl font-bold text-gray-900">{title} <span className='text-[16px]'>(3)</span> </h1>
      <Link href={buttonLink} className={clsx(buttonClassName)}>
        {buttonLabel}
      </Link>
    </div>
  );
};

export default PageLayout;