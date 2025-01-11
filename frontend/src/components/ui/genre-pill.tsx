import React from 'react';
import { GenreIcon } from './genre-icon';

interface GenrePillProps {
  genre: string;
  isSelected: boolean;
  onClick: () => void;
}

export const GenrePill: React.FC<GenrePillProps> = ({ 
  genre, 
  isSelected, 
  onClick
}) => {
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`cursor-pointer rounded-lg transition-colors
        ${isSelected 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-100 hover:bg-gray-200'}`}
    >
      <div className="flex items-center justify-center gap-2 p-2">
        <GenreIcon genre={genre} />
        <span className="truncate text-sm">{genre}</span>
      </div>
    </div>
  );
}; 