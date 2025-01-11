import React, { useState, useRef, useEffect } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './components/ui/alert';
import { GenrePill } from './components/ui/genre-pill';
import { ModelIntroSection } from './components/ui/model-intro-section';
import { GenreIcon } from './components/ui/genre-icon';

const MusicClassifier: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prediction, setPrediction] = useState<{ genre: string; confidence: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const genres = [
    'Blues', 'Classical', 'Country', 'Disco', 
    'HipHop', 'Jazz', 'Metal', 'Pop', 
    'Reggae', 'Rock'
  ];

  const SUPPORTED_FORMATS = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelection = (selectedFile: File) => {
    if (selectedFile && SUPPORTED_FORMATS.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
      setPrediction(null);
      setIsPlaying(false);
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (audioRef.current && e.target?.result) {
          if (audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src);
          }
          
          audioRef.current.src = e.target.result as string;
          audioRef.current.load();
          
          console.log('Audio file loaded:', {
            fileName: selectedFile.name,
            fileSize: selectedFile.size,
            fileType: selectedFile.type
          });
        }
      };
      
      reader.onerror = () => {
        setError('Error reading audio file');
      };
      
      reader.readAsDataURL(selectedFile);
    } else {
      setError('Please upload a valid audio file (MP3 or WAV)');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        if (audioRef.current.readyState === 0) {
          audioRef.current.load();
        }
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioRef.current.readyState === 0) {
          audioRef.current.load();
        }
        audioRef.current.play().catch(e => {
          console.error("Audio playback failed:", e);
          setError("Couldn't play audio. Please try again.");
          setIsPlaying(false);
          return;
        });
        setIsPlaying(true);
      }
    }
  };

  const handleClassification = async () => {
    if (!file) return;
    setIsClassifying(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending classification request...');
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Received response:', data);

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Classification failed');
      }

      setPrediction(data);
      console.log('Set prediction:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Classification error:', err);
    } finally {
      setIsClassifying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      console.log('Audio element state:', {
        src: audioRef.current.src,
        readyState: audioRef.current.readyState,
        paused: audioRef.current.paused,
        error: audioRef.current.error
      });
    }
    return () => {
      if (audioRef.current?.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, [file]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Genre Pills - Add a fixed height container */}
      <div className="relative min-h-[300px]">  {/* Add fixed minimum height */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 absolute w-full">
          {genres.map((genre) => (
            <GenrePill
              key={genre}
              genre={genre}
              isSelected={selectedGenre === genre}
              onClick={() => handleGenreClick(genre)}
            />
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${!file ? 'cursor-pointer' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav"
          className="hidden"
          onChange={handleFileInput}
        />
        {!file ? (
          <>
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg">Drag and drop your audio file here</p>
              <p className="text-sm text-gray-500">or click to browse</p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="font-medium">{file.name}</p>
            <div className="flex justify-center items-center gap-4">
              <audio 
                ref={audioRef} 
                className="w-full max-w-[300px] h-10"
                preload="metadata"
                controls
                controlsList="nodownload"
                style={{ backgroundColor: 'white', borderRadius: '8px' }}
                onEnded={() => setIsPlaying(false)}
                onCanPlay={() => {
                  console.log('Audio can play now');
                }}
                onError={(e) => {
                  console.error("Audio error:", e);
                  setError("Error loading audio file");
                  setIsPlaying(false);
                }}
                onLoadedData={() => {
                  console.log("Audio loaded successfully");
                }}
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPrediction(null);
                  setError(null);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.src = '';
                  }
                }}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Classify Button */}
      {file && !prediction && (
        <button
          onClick={handleClassification}
          className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 
            transition-colors flex items-center justify-center gap-2 
            ${isClassifying ? 'opacity-75 cursor-not-allowed' : ''}`}
          disabled={isClassifying}
        >
          {isClassifying ? (
            <>
              <div className="flex gap-1 items-center">
                {[1,2,3,4].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-white rounded-full animate-waveform"
                    style={{
                      height: '20px',
                      animation: `waveform 0.5s ease-in-out ${i * 0.1}s infinite alternate`
                    }}
                  />
                ))}
              </div>
              Classifying
            </>
          ) : (
            'Classify Genre'
          )}
        </button>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6">
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Detected Genre</h2>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <GenreIcon genre={prediction.genre} />
                  <span className="text-3xl font-semibold text-blue-600">
                    {prediction.genre}
                  </span>
                </div>
              </div>
              
              <div className="max-w-xs mx-auto">
                <div className="relative pt-1">
                  <div className="text-xs mb-1 flex justify-between">
                    <span className="font-semibold text-gray-600">Confidence Score</span>
                    <span className="font-bold text-blue-600">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-blue-500 rounded transition-all duration-500 ease-out"
                      style={{ width: `${prediction.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ModelIntroSection />
        </div>
      )}
    </div>
  );
};

export default MusicClassifier;