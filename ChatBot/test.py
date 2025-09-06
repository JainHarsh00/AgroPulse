import requests

# Replace with your FastAPI server URL and port
url = "http://127.0.0.1:8000/chat"

data = {
    "message": "Hello AgroPulse! Tell me about rice diseases."
}

response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:", response.json())
