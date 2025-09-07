# Use a lightweight Python base image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements and install
COPY ChatBot/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code (including frontend/dist)
COPY ChatBot/ . 

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
