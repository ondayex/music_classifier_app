from flask import Flask, request, jsonify
from flask_cors import CORS
from models.classifier import GenreClassifier
from utils.audio_processing import process_audio_file
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

# Initialize the classifier
classifier = GenreClassifier()

ALLOWED_EXTENSIONS = {"mp3", "wav"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/predict", methods=["POST"])
def predict_genre():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    try:
        # Process the audio file - this returns the batch
        features = process_audio_file(file)

        # Make prediction using the batch
        prediction = classifier.predict(features)

        return jsonify(
            {"genre": prediction["genre"], "confidence": prediction["confidence"]}
        )

    except Exception as e:
        error_message = str(e)
        print(f"Error during prediction: {error_message}")
        return (
            jsonify({"error": "Classification failed", "details": error_message}),
            500,
        )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
