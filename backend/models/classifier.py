import tensorflow as tf
import numpy as np
from typing import Dict
from config import Config


class GenreClassifier:
    def __init__(self):
        try:
            self.model = tf.keras.models.load_model(Config.MODEL_PATH)
            print(f"Model loaded successfully from {Config.MODEL_PATH}")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise

    def predict(self, features: np.ndarray) -> Dict[str, float]:
        """Predict genre using the same method as training."""
        try:
            # Get predictions for all chunks
            predictions = self.model.predict(features, verbose=0)

            # Get the most common prediction across chunks
            predicted_categories = np.argmax(predictions, axis=1)
            unique_elements, counts = np.unique(
                predicted_categories, return_counts=True
            )

            # Get the most frequent prediction
            max_count = np.max(counts)
            max_elements = unique_elements[counts == max_count]
            predicted_index = max_elements[0]

            # Calculate confidence as the proportion of chunks predicting this genre
            confidence = max_count / len(predicted_categories)

            return {
                "genre": Config.GENRES[predicted_index],
                "confidence": float(confidence),
            }

        except Exception as e:
            print(f"Prediction error: {str(e)}")
            raise
