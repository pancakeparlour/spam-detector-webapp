backend/
├── main.py
├── requirements.txt
├── models/
│   ├── __init__.py
│   ├── logistic_regression/
│   │   ├── __init__.py
│   │   ├── model.pkl (or .joblib)
│   │   ├── vectorizer.pkl (if using TF-IDF/CountVectorizer)
│   │   └── preprocessor.py
│   └── knn/
│       ├── __init__.py
│       ├── model.pkl (or .joblib)
│       ├── vectorizer.pkl
│       └── preprocessor.py
├── data/
│   ├── train_dataset.csv
│   ├── test_dataset.csv
│   └── processed_data.csv
├── utils/
│   ├── __init__.py
│   └── model_loader.py
└── __pycache__/