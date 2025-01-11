FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install gunicorn

# Copy the rest of the application
COPY backend/ .

# Expose the port your app runs on
EXPOSE 5000

# Update the command to use the correct path to wsgi.py
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"] 