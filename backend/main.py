from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

class JobInquiry(BaseModel):
    firstName: str
    lastName: str
    emailAddress: EmailStr
    phoneNumber: str
    jobRole: str
    inquiryBody: str

app = FastAPI()

# Allow frontend connection
app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_methods=["*"],
        allow_headers=["*"],
        )

@app.get("/")
async def root():
    return {"message": "FastAPI backend connected"}

# this is where the frontend stuff will come to
# we're expecting a json body matching the jobinquiry model
@app.post("/inquiry")
async def submit_inquiry(inquiry: JobInquiry):
    # we acknowledge receipt of inquiry for now
    print(inquiry.model_dump())
    return {"status": "ok", "message": "Inquiry received"}