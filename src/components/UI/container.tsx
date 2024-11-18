import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  styled?: boolean;
}

const Container = ({ children, className, styled }: ContainerProps) => {
  const defaultStyles = styled ? 'max-w-6xl p-4 bg-neutral-200 rounded-md shadow-sm m-2' : '';
  return (
    <div className={`${defaultStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
