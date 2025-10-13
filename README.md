# Spam Detection Web Application

### Frontend
- React.js using Vite
- Axios for API calls
- Chart.js / Plotly for visualizations

### Backend
- FastAPI server
- Logistic Regression, KNN, and K-Means models
- Endpoints: /predict, /predict_knn, /cluster, /stats

### How to run
#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
