import React from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  file: File | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onDrop,
  onChange,
  isLoading,
  file,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps({ onChange })} />
      <div className="space-y-4">
        <div className="text-6xl text-gray-400">⬆️</div>
        <div className="text-xl font-medium">
          {isDragActive
            ? "Drop your audio file here"
            : "Drag and drop your audio file here"}
        </div>
        <div className="text-gray-500">or click to browse</div>
        {file && (
          <div className="text-sm text-gray-600">
            Selected file: {file.name}
          </div>
        )}
      </div>
    </div>
  );
}; 