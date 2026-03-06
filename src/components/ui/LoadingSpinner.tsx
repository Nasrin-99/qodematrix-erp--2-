import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

export const LoadingSpinner = ({ className, size = 24 }: LoadingSpinnerProps) => {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <Loader2 className="animate-spin text-indigo-600" size={size} />
    </div>
  );
};
