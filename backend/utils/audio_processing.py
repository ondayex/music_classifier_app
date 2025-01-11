import librosa
import numpy as np
import io
import tensorflow as tf
from tensorflow.image import resize
from typing import List
from flask import abort


def process_audio_file(file, target_shape=(150, 150)) -> np.ndarray:
    """Process audio file using the same method as training."""
    try:
        # Read file bytes and load audio
        audio_data = file.read()
        audio_array, sample_rate = librosa.load(io.BytesIO(audio_data), sr=None)
        print(f"Loaded audio shape: {audio_array.shape}, Sample rate: {sample_rate}")

        # Define chunk parameters
        chunk_duration = 4  # seconds
        overlap_duration = 2  # seconds

        # Convert durations to samples
        chunk_samples = chunk_duration * sample_rate
        overlap_samples = overlap_duration * sample_rate

        # Calculate number of chunks
        num_chunks = (
            int(
                np.ceil(
                    (len(audio_array) - chunk_samples)
                    / (chunk_samples - overlap_samples)
                )
            )
            + 1
        )
        print(f"Processing {num_chunks} chunks")

        chunks = []
        for i in range(num_chunks):
            # Calculate chunk boundaries
            start = i * (chunk_samples - overlap_samples)
            end = start + chunk_samples

            # Extract chunk
            chunk = audio_array[start:end]

            # Compute mel spectrogram
            mel_spectrogram = librosa.feature.melspectrogram(y=chunk, sr=sample_rate)

            # Resize with additional dimension
            mel_spec_resized = resize(
                np.expand_dims(mel_spectrogram, axis=-1), target_shape
            )
            chunks.append(mel_spec_resized)

        # Stack chunks into batch
        batch = np.stack(chunks)
        print(f"Final batch shape: {batch.shape}")
        return batch

    except Exception as e:
        print(f"Error processing audio: {str(e)}")
        abort(400, description=f"Error processing audio: {str(e)}")
