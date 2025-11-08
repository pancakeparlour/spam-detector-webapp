from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# import model stuff
from pathlib import Path
import joblib

# to help with model metrics endpoint
from typing import Dict

# we're gonna reuse the clean_text function
from preprocessing import clean_text

# we load the saved log_reg model and tfidf vectorizer
# and the basic metrics we saved
MODEL_DIR = Path("saved_models")
MODEL_PATH = MODEL_DIR / "clf_model.joblib"
VECTORIZER_PATH = MODEL_DIR / "clf_vectorizer.joblib"
METRICS_PATH = MODEL_DIR / "clf_metrics.joblib"

try:
    clf = joblib.load(MODEL_PATH)
    tfidf = joblib.load(VECTORIZER_PATH)
    metrics = joblib.load(METRICS_PATH)
except FileNotFoundError as e:
    raise RuntimeError(
        "trained models not found, run the training script."
    ) from e

# this is the definition of the job inquiry data structure
class JobInquiry(BaseModel):
    firstName: str
    lastName: str
    emailAddress: EmailStr
    phoneNumber: str
    jobRole: str
    inquiryBody: str

# this is the definition of the inquiry result data structure
# i'd edit this class to include more info for charts etc.
# it is the shape of the thing we send back to the frontend
class InquiryResult(BaseModel):
    verdict: bool
    probability: float
    label: str
    metrics: dict[str, float]

app = FastAPI()

# Allow frontend connection
app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_methods=["*"],
        allow_headers=["*"],
        )

# a basic health check point
@app.get("/")
async def root():
    return {"message": "FastAPI backend connected"}

# an endpoint to return the model metrics we preload above
# could be useful to see metrics of the model behind running
# in the backend
@app.get("/metrics")
async def fetch_metrics() -> Dict[str, float]:
    if not metrics:
        raise HTTPException(status_code=503, detail="backend model metrics currently unavailable")
    # joblibs store as numpy types, we need in json. so cast to flt
    return {name: float(value) for name, value in metrics.items()}

# this is where the frontend stuff will come to
# we're expecting a json body matching the jobinquiry model
@app.post("/inquiry", response_model=InquiryResult)
async def submit_inquiry(inquiry: JobInquiry):
    cleaned = clean_text(inquiry.inquiryBody)
    if not cleaned:
        raise HTTPException(status_code=400, detail="inquiry body was empty after cleaned.")

    # uhh, xan you'd understand these next 4 lines better than me lol
    X = tfidf.transform([cleaned])
    prob = float(clf.predict_proba(X)[0, 1])
    is_spam = prob >= 0.5
    label = "spam" if is_spam else "ham"

    # and we send back the result!
    return InquiryResult(
        verdict=is_spam,
        probability=prob,
        label=label,
        metrics=metrics # L82 in preprocessing.py
    )

    # we acknowledge receipt of inquiry for now
    print(inquiry.model_dump())
    return {"status": "ok", "message": "Inquiry received"}