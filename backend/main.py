from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    return {"message": "FastAPI backend connected successfully"}

@app.get("/predict/{value}")
async def predict(value: int):
    # simple mock model logic
    result = "spam" if value % 2 == 0 else "not spam"
    return {"prediction": result}
