import React from 'react';
import { Slot } from '@radix-ui/react-slot';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'default', children }) => {
  const baseStyles = "p-4 rounded-lg border";
  const variantStyles = {
    default: "bg-blue-50 border-blue-200 text-blue-700",
    destructive: "bg-red-50 border-red-200 text-red-700"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-sm">
    {children}
  </div>
); 