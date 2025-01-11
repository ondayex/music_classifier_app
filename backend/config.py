import os


class Config:
    # Flask configuration
    SECRET_KEY = os.environ.get("SECRET_KEY") or "your-secret-key-here"

    # Model configuration
    MODEL_PATH = "trained_models/Trained_model.h5"

    # Genres
    GENRES = [
        "Blues",
        "Classical",
        "Country",
        "Disco",
        "HipHop",
        "Jazz",
        "Metal",
        "Pop",
        "Reggae",
        "Rock",
    ]
