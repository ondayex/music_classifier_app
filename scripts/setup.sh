#!/bin/bash

# Install frontend dependencies
cd frontend
npm install
npm install --save-dev @types/react @types/react-dom
npm install lucide-react @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-separator

# Install backend dependencies
cd ../backend
python -m venv .venv
# Handle different OS paths
if [ -f ".venv/Scripts/activate" ]; then
    source .venv/Scripts/activate
else
    source .venv/bin/activate
fi
pip install -r requirements.txt

echo "Setup completed successfully!" 