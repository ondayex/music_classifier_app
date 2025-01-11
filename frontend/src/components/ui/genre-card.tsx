import React from 'react';

interface GenreCardProps {
  icon: string;
  name: string;
}

export const GenreCard: React.FC<GenreCardProps> = ({ icon, name }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-100 transition-colors">
      <span className="text-2xl">{icon}</span>
      <span className="text-xl font-medium">{name}</span>
    </div>
  );
}; 