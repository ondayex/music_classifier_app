import React from 'react';
import { ChevronDown } from 'lucide-react';
import { GenreIcon } from './genre-icon';

interface GenrePillProps {
  genre: string;
  isSelected: boolean;
  onClick: () => void;
}

const getGenreDescription = (genre: string): string => {
  const descriptions: Record<string, string> = {
    Blues: "Soulful music characterized by call-and-response patterns and blue notes",
    Classical: "Traditional Western music from the Middle Ages to the present day",
    Country: "American folk music with rural roots and simple harmonies",
    Disco: "Upbeat dance music from the 1970s with a strong beat and bassline",
    HipHop: "Urban music characterized by rhythmic vocals and backing beats",
    Jazz: "Complex, improvisational music with swing and blue notes",
    Metal: "Heavy rock music with intense, amplified distortion and powerful vocals",
    Pop: "Contemporary popular music with catchy melodies and rhythms",
    Reggae: "Jamaican music characterized by offbeat rhythms and social messages",
    Rock: "Guitar-driven music with strong beats and varied stylistic influences"
  };
  return descriptions[genre] || "Genre description not available";
};

export const GenrePill: React.FC<GenrePillProps> = ({ 
  genre, 
  isSelected, 
  onClick
}) => {
  const description = getGenreDescription(genre);
  
  return (
    <div className={`${isSelected ? 'sm:col-span-5' : 'col-span-1'} h-full`}>
      <div 
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        className={`relative cursor-pointer rounded-lg h-full
          ${isSelected 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-100 hover:bg-gray-200'}`}
      >
        <div className="flex items-center justify-center gap-2 p-2">
          <GenreIcon genre={genre} />
          <span className="truncate text-sm">{genre}</span>
        </div>

        {isSelected && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-blue-500 text-white rounded-lg p-4 shadow-lg">
            <p className="text-sm">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}; 