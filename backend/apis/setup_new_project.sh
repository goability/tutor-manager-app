#!/bin/bash

# Define the project structure
PROJECT_NAME="lessons-api"
DIRECTORIES=(
    "$PROJECT_NAME"
    "$PROJECT_NAME/app"
)
FILES=(
    "$PROJECT_NAME/app/__init__.py"
    "$PROJECT_NAME/app/main.py"
    "$PROJECT_NAME/app/routes.py"
    "$PROJECT_NAME/requirements.txt"
    "$PROJECT_NAME/Dockerfile"
    "$PROJECT_NAME/docker-run.sh"
    "$PROJECT_NAME/handler.py"
    "$PROJECT_NAME/postman_collection.json"
    "$PROJECT_NAME/README.md"
)

# Create directories
echo "Setting up project directories..."
for DIR in "${DIRECTORIES[@]}"; do
    if [ ! -d "$DIR" ]; then
        mkdir -p "$DIR"
        echo "Created directory: $DIR"
    else
        echo "Directory already exists: $DIR"
    fi
done

# Create files
echo "Setting up project files..."
for FILE in "${FILES[@]}"; do
    if [ ! -f "$FILE" ]; then
        touch "$FILE"
        echo "Created file: $FILE"
    else
        echo "File already exists: $FILE"
    fi
done

# Populate sample files
echo "Populating initial files..."
if [ ! -s "$PROJECT_NAME/app/main.py" ]; then
    cat > "$PROJECT_NAME/app/main.py" <<EOL
from fastapi import FastAPI
from app.routes import router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI Lambda service!"}

# Include your API routes
app.include_router(router)
EOL
    echo "Populated: app/main.py"
fi

if [ ! -s "$PROJECT_NAME/app/routes.py" ]; then
    cat > "$PROJECT_NAME/app/routes.py" <<EOL
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/process")
def process_data(data: dict):
    if "key" not in data:
        raise HTTPException(status_code=400, detail="Key 'key' is required.")
    return {"processed_data": f"Received {data['key']}"}
EOL
    echo "Populated: app/routes.py"
fi

if [ ! -s "$PROJECT_NAME/requirements.txt" ]; then
    cat > "$PROJECT_NAME/requirements.txt" <<EOL
fastapi
boto3
aws-lambda-powertools
uvicorn
EOL
    echo "Populated: requirements.txt"
fi

if [ ! -s "$PROJECT_NAME/docker-run.sh" ]; then
    cat > "$PROJECT_NAME/docker-run.sh" <<EOL
#!/bin/bash

# build
docker build -t $PROJECT_NAME .
# run
docker run -p 8000:8000 $PROJECT_NAME
EOL
    echo "Populated: docker-run.sh"
    chmod +x "$PROJECT_NAME/docker-run.sh"
fi

if [ ! -s "$PROJECT_NAME/Dockerfile" ]; then
    cat > "$PROJECT_NAME/Dockerfile" <<EOL
FROM python:3.9-slim

# Set up working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app /app/app
COPY handler.py /app/handler.py

# Default command for local FastAPI testing
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOL
    echo "Populated: Dockerfile"
fi

if [ ! -s "$PROJECT_NAME/handler.py" ]; then
    cat > "$PROJECT_NAME/handler.py" <<EOL
import json
from aws_lambda_powertools.event_handler.api_gateway import ApiGatewayResolver
from app.main import app
from fastapi.testclient import TestClient

resolver = ApiGatewayResolver()

client = TestClient(app)

@resolver.get("/")
def index():
    response = client.get("/")
    return json.loads(response.content)

@resolver.post("/process")
def process():
    event_body = resolver.current_event.json_body
    response = client.post("/process", json=event_body)
    return json.loads(response.content)

def lambda_handler(event, context):
    return resolver.resolve(event, context)
EOL
    echo "Populated: handler.py"
fi

if [ ! -s "$PROJECT_NAME/postman_collection.json" ]; then
    cat > "$PROJECT_NAME/postman_collection.json" <<EOL
{
  "info": {
    "name": "FastAPI Lambda Service",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Root Endpoint",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/",
          "host": ["{{baseUrl}}"]
        }
      }
    },
    {
      "name": "Process Data",
      "request": {
        "method": "POST",
        "url": {
          "raw": "{{baseUrl}}/process",
          "host": ["{{baseUrl}}"],
          "path": ["process"]
        },
        "body": {
          "mode": "raw",
          "raw": "{\"key\": \"value\"}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        }
      }
    }
  ]
}
EOL
    echo "Populated: postman_collection.json"
fi

if [ ! -s "$PROJECT_NAME/README.md" ]; then
    echo "# FastAPI Lambda Service" > "$PROJECT_NAME/README.md"
    echo "Basic FastAPI service designed for AWS Lambda." >> "$PROJECT_NAME/README.md"
    echo "Populated: README.md"
fi

echo "Project setup complete!"
