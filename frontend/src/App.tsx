import { FC } from 'react';
import MusicClassifier from './MusicClassifier';
import { Music } from 'lucide-react';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 bg-gray-100/95 backdrop-blur-sm z-10 h-[160px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center w-full">
            <div className="container mx-auto max-w-4xl px-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text flex items-center justify-center gap-3">
                <Music className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <span>Music Genre Classifier</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 font-light tracking-wide">
                Discover the genre of any music with AI-powered analysis
              </p>
              <div className="mt-2 flex justify-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  10 Genres
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                  Deep Learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative pt-[160px]">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white shadow-lg rounded-3xl p-8">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <MusicClassifier />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App; 