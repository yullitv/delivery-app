import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("bg-white p-6 rounded-xl shadow-sm border border-gray-100", className)}>
      {children}
    </div>
  );
};

export default Card;