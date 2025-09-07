# Use a lightweight Python base image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements and install
COPY Chatbot/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY Chatbot/ . 

# Copy React build
COPY Chatbot/frontend/dist ./frontend/dist

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
