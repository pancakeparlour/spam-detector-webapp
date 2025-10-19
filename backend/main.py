# app = FastAPI()

# Allow frontend connection
# app.add_middleware(
#        CORSMiddleware,
#        allow_origins=["http://localhost:3000"],
#        allow_methods=["*"],
#        allow_headers=["*"],
#        )

#@app.get("/")
#async def root():
 #   return {"message": "FastAPI backend connected successfully"}
#
#@app.get("/predict/{value}")
#async def predict(value: int):
 #   # simple mock model logic
  #  result = "spam" if value % 2 == 0 else "not spam"
   # return {"prediction": result}

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from joblib import load
import time
from pathlib import Path
from models.log_reg import clean_text  # import your cleaning function

app = FastAPI()

class Email(BaseModel):
    job: str
    inquiryBody: str

def get_db():
    return {"db": "Simulated database connection"}

# backend/main.py

# Initialize FastAPI app
app = FastAPI(title="Spam Email Detection API")

MODEL_DIR = Path(__file__).resolve().parent / "models" / "saved_models"
model = load(MODEL_DIR / "clf_model.joblib")
vectorizer = load(MODEL_DIR / "clf_vectorizer.joblib")

class EmailInput(BaseModel):
    subject: str
    body: str

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    print(f"Request: {request.url} completed in {duration:.3f}s")
    return response

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )

@app.get("/")
def read_root():
    return {"message": "Spam Detection API is running"}

@app.post("/detect-spam/")
def detect_spam(email: EmailInput):
    text = email.subject + " " + email.body
    text = clean_text(text)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Empty email text provided")

    X = vectorizer.transform([text])
    y_prob = model.predict_proba(X)[0, 1]
    label = "Spam" if y_prob >= 0.5 else "Ham"

    return {"label": label, "probability": round(float(y_prob), 3)}

@app.get("/detect-spam/")
def detect_spam_get(subject: str, body: str):
    text = clean_text(subject + " " + body)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Empty email text provided")

    X = vectorizer.transform([text])
    y_prob = model.predict_proba(X)[0, 1]
    label = "Spam" if y_prob >= 0.5 else "Ham"

    return {"label": label, "probability": round(float(y_prob), 3)}


"""
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"Request: {request.url} - Duration: {process_time} seconds")
    return response

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "error": "An error occurred"}
    )

@app.get("/emails/{email_id}")
def get_item(email_id: int, db=Depends(get_db)):
    if email_id not in [1, 2, 3]:  # Simulate item check
        raise HTTPException(status_code=404, detail="Item not found")
    return {"email_id": email_id, "db_connection": db["db"]}	

@app.post("/emails/")
def create_email(email: Email, db=Depends(get_db)):
    return {"email": email, "db_connection": db["db"]}

@app.put("/email/{email_id}")
def update_email(email_id: int, item: Email, db=Depends(get_db)):
    if email_id not in [1, 2, 3]:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item_id": item_id, "updated_item": item, "db_connection": db["db"]}

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db=Depends(get_db)):
    if item_id not in [1, 2, 3]:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"detail": "Item deleted", "item_id": item_id, "db_connection": db["db"]}

@app.get("/info/")
def get_info():
    headers = {"X-Info-Version": "1.0", "X-Student-Task": "Create Custom Path"}
    return JSONResponse(content={"message": "Custom path created successfully!"}, headers=headers)

@app.get("/items/{item_id}/with-discount/")
def get_item_with_discount(item_id: int, discount: float = None, db=Depends(get_db)):
    if item_id not in [1, 2, 3]:
        raise HTTPException(status_code=404, detail="Item not found")
    item = {"item_id": item_id, "price": 100.0}  # Simulated item with price
    if discount:
        item["discounted_price"] = item["price"] * (1 - discount)
    return {"item": item, "db_connection": db["db"]}

def background_task(item_id: int):
    time.sleep(5)  # Simulate long task
    print(f"Background task completed for item {item_id}")

@app.post("/items/{item_id}/background-task/")
def run_background_task(item_id: int, background_tasks: BackgroundTasks, db=Depends(get_db)):
    background_tasks.add_task(background_task, item_id)
    return {"message": "Background task started", "item_id": item_id, "db_connection": db["db"]}
"""