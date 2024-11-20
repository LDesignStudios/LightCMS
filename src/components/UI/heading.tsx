import React from 'react';
import clsx from 'clsx';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  level = 2,
  className = '',
  children,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements; 

  return (
    <Tag className={clsx('font-bold', className)}>
      {children}
    </Tag>
  );
};

export default Heading;