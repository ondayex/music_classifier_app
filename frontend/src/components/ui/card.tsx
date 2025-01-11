import React from 'react';
import { Slot } from '@radix-ui/react-slot';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = ""
}) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
); 