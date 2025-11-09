# Spam Classifier App

Set up the backend (FastAPI) and frontend (React) once, then run each in its own terminal. The steps work on macOS, Linux, and Windows (use PowerShell or Command Prompt).

--------------------------------------------------------------

## 1. Find and open the project

```
# unzip the zip file in your file explorer
# open terminal, then navigate to the folder like so
cd /Users/your-name/downloads/spam-detector-webapp              #replace this path with the actual file path you have saved the folder to
```

## 2. Backend setup

```
cd backend
python -m venv venv                        # use python3 on mac/Linux if needed
# Activate the environment:
#   Windows:   venv\Scripts\activate
#   mac/Linux: source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt            # this txt file also include the pakcages used for the frontend
```

## 3. Frontend setup

```
cd ../frontend
npm install
```

---

## Running the app (you should use two terminals)

### Terminal 1 – Backend

```
cd backend
# activate the virtual environment as above
uvicorn main:app --reload
```

### Terminal 2 – Frontend

```
cd frontend
npm start
```

Open http://localhost:3000 for the React app. It communicates with the FastAPI backend at http://127.0.0.1:8000.
