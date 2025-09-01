# 💳 AI Model for Flagging Suspicious Transactions

Financial institutions process millions of transactions daily, making it challenging to manually monitor each one for fraud or suspicious activity.  
This project builds an **AI/ML-based fraud detection system** that analyzes transaction data in real-time, flags suspicious behavior, and provides interactive dashboards for investigation.  

---

## 🚀 Project Overview
Traditional rule-based fraud detection systems are often **rigid** and prone to:
- Missing **new fraud patterns**.
- Generating **high false positives**.

Our solution uses **Machine Learning & AI** to detect fraud more **accurately and adaptively**.

---

## 🎯 Objectives
- ✅ Build an **adaptive AI system** that learns from evolving fraud trends.  
- ✅ Accurately classify transactions as **Normal** or **Suspicious**.  
- ✅ Reduce **false positives** for financial institutions.  
- ✅ Provide **real-time monitoring dashboards** and **alerts** for investigators.  

---

## 🛠 Key Tasks
1. **Data Collection & Preprocessing**  
   - Using structured/simulated transaction dataset (`demo_sample_dataset.csv`).  
   - Cleaning, normalization, and feature extraction.  

2. **Feature Engineering**  
   - Frequency of transactions.  
   - Geographic anomalies.  
   - Merchant/category outliers.  
   - Amount spikes compared to user history.  

3. **Model Training & Adaptation**  
   - Train ML/AI model to classify transactions.  
   - Continuously adapt to evolving fraud patterns.  

4. **Visualization & Alerts**  
   - Real-time **frontend dashboard**.  
   - Highlight **flagged suspicious transactions**.  
   - Provide **analytics & trends**.  

---

## 🖥️ Tech Stack
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui + Recharts  
- **Backend**: Python (Flask/FastAPI) → `app.py`  
- **AI/ML Model**: Python (Scikit-learn / TensorFlow / PyTorch)  
- **Dataset**: `demo_sample_dataset.csv`  

---

## 📂 Project Structure
├── frontend/ # React dashboard (UI)

├── backend/

│ └── app.py # Python backend (API + model integration)

├── dataset/

│ └── demo_sample_dataset.csv # Sample transaction dataset

└── README.md # Documentation



---

## ⚡ Setup Instructions

### 1️⃣ Clone Repository

git clone https://github.com/<your-username>/fraud-detection-ai.git
cd fraud-detection-ai

2️⃣ Frontend Setup

cd frontend
npm install
npm run dev
App will run at: http://localhost:5173

3️⃣ Backend Setup

cd backend
pip install -r requirements.txt
python app.py
Backend API will run at: http://localhost:5000

📊 Features
🔍 Real-time Transaction Monitoring

⚠️ Suspicious Transaction Alerts

📈 Analytics & Visualizations (charts, trends)

🧠 Adaptive AI/ML model with retraining capability

🌍 Geographic & Merchant anomaly detection

👨‍💻 Team Members

1. Purvi Khandelwal

2. Harshita Swarnkar

3. Agam Katiyar

🏆 Future Enhancements
🔐 Role-based access for investigators and auditors.

🌐 Deployment on AWS/GCP for large-scale monitoring.

📡 Streaming data pipeline (Kafka / Spark) for real-time ingestion.

🤖 Integration with law enforcement alert systems.
