import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from './card';
import { Brain, Layers, Maximize2, Filter, Box, BarChart2 } from 'lucide-react';

export const ModelIntroSection: React.FC = () => (
  <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100">
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
          About the Model
        </h2>
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-gray-600 leading-relaxed">
          This classifier uses a deep Convolutional Neural Network (CNN) trained on the GTZAN dataset, 
          which includes 1000 audio tracks across 10 genres.
        </p>

        <div className="mt-6">
          <h3 className="font-semibold text-blue-700 mb-3">Architecture Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <Layers className="w-4 h-4" />, text: "6 convolutional blocks with increasing filters (32 → 512)" },
              { icon: <Maximize2 className="w-4 h-4" />, text: "Max pooling layers for feature reduction" },
              { icon: <Filter className="w-4 h-4" />, text: "Dropout layers (0.3, 0.45) for regularization" },
              { icon: <Box className="w-4 h-4" />, text: "Dense layer with 1200 units" },
              { icon: <BarChart2 className="w-4 h-4" />, text: "Softmax output for 10-class classification" }
            ].map(({ icon, text }, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <div className="text-blue-500">{icon}</div>
                <span className="text-sm text-gray-600">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 text-blue-600 hover:text-blue-700 bg-white/70 p-3 rounded-lg w-fit">
          <ExternalLink className="w-4 h-4" />
          <a 
            href="https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification/data"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium"
          >
            View Dataset on Kaggle
          </a>
        </div>
      </div>
    </CardContent>
  </Card>
); 