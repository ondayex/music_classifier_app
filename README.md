# Music Genre Classification App

An end-to-end machine learning web application designed to automatically analyze audio tracks and predict their musical genre.

## Motivation

The digital music landscape handles millions of new tracks daily across streaming services, digital archives, and personal libraries. Manually tagging these files with accurate genres is time-consuming, highly subjective, and unscalable. 

This project addresses that bottleneck by offering an automated pipeline that bridges digital signal processing (DSP) and machine learning. By utilizing advanced audio feature extraction techniques (such as Mel-Frequency Cepstral Coefficients—MFCCs, spectral chroma, and tempo tracking) and pairing them with a classification model, the application delivers immediate and objective genre predictions. The ultimate goal is to provide developers and audio enthusiasts with an accessible, intuitive interface to interact with audio AI models without needing a background in data science.

## Quick Start

Follow these steps to set up and launch the application on your local machine.

### Prerequisites
* **Python 3.9+** installed on your system.
* **FFmpeg** (Required by underlying audio libraries like `librosa` or `pydub` to decode compressed audio formats like `.mp3`).
  * *Mac:* `brew install ffmpeg`
  * *Linux:* `sudo apt install ffmpeg`
  * *Windows:* Install via Chocolatey `choco install ffmpeg` or download the binaries directly.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ondayex/music_classifier_app.git](https://github.com/ondayex/music_classifier_app.git)
   cd music_classifier_app
Set up a virtual environment (Recommended):

Bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
Install the required dependencies:

Bash
pip install -r requirements.txt
Running the App
Start the application by running the main execution file:

Bash
python app.py
(Note: If your web application is built using Streamlit, use streamlit run app.py instead).

Once started, open your web browser and navigate to the local URL displayed in your terminal (usually http://localhost:5000 or http://localhost:8501).

Usage
Using the web application is straightforward:

Upload Audio: Click the file uploader area or drag and drop an audio file (.wav or .mp3 are preferred).

Process & Analyze: The application automatically cuts or samples the audio to the required length (typically a 30-second window) and extracts key structural features.

View Results: The application outputs the top predicted genre along with a visual confidence breakdown (bar chart or percentages) indicating how strongly the model associates the track with alternative genres (e.g., Rock, Jazz, Hip-Hop, Classical).

Supported Formats
.wav – Best choice for optimal prediction accuracy, as lossless files maintain full spectral integrity.

.mp3 – Supported and compressed, though minor classification variances may occur due to encoding loss.

Contributing
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this project better, please fork the repo and create a pull request:

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Planned Roadmap & Areas to Contribute:
Expanding the core model to support modern sub-genres.

Implementing deep learning architectures (like Convolutional Neural Networks on Mel-Spectrograms) for superior accuracy.

Adding an interactive audio player with real-time waveform visualization in the UI.
