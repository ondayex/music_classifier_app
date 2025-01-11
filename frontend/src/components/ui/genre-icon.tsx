import React from 'react';
import { Music } from 'lucide-react';

interface GenreIconProps {
  genre: string;
}

type IconMapType = {
  [key in 'blues' | 'classical' | 'country' | 'disco' | 'hiphop' | 'jazz' | 'metal' | 'pop' | 'reggae' | 'rock']: JSX.Element;
};

export const GenreIcon: React.FC<GenreIconProps> = ({ genre }) => {
  const iconMap: IconMapType = {
    blues: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path d="M9 18V5l12-2v13"/><path d="M9 9c-5 0-5 8 0 8s5-8 0-8z"/></svg>,
    classical: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    country: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path d="M12 8c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/><path d="M12 8V3"/><path d="M16 12h5"/></svg>,
    disco: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    hiphop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path d="M12 3v18"/><path d="M8 7v10"/><path d="M16 7v10"/><path d="M4 11v2"/><path d="M20 11v2"/></svg>,
    jazz: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path d="M9 18V5l12-2v13"/><path d="M6 18h12"/><path d="M9 18c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z"/></svg>,
    metal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path d="M7 3L2 12l5 9"/><path d="M17 3l5 9-5 9"/><path d="M11 3l-4 18"/><path d="M13 3l4 18"/></svg>,
    pop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8V7"/></svg>,
    reggae: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 12c-2.8 0-5-2.2-5-5"/><path d="M12 12c2.8 0 5 2.2 5 5"/></svg>,
    rock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2"><path d="M14 3l-8 8"/><path d="M10 3h4v4"/><path d="M17 7l-8 8"/><path d="M13 7h4v4"/><path d="M20 11l-8 8"/><path d="M16 11h4v4"/></svg>
  };

  const lowerGenre = genre.toLowerCase() as keyof IconMapType;
  return iconMap[lowerGenre] || <Music className="w-4 h-4" />;
}; 