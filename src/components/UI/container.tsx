import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  styled?: boolean;
}

const Container = ({ children, className, styled }: ContainerProps) => {
  const defaultStyles = styled ? 'p-4 bg-neutral-200 rounded-md shadow-sm m-4' : '';
  return (
    <div className={`${defaultStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
