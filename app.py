import streamlit as st
import pandas as pd
import numpy as np
import time

# Mock prediction and explanation for demo - replace with actual backend API calls
def mock_predict(txn):
    amount = txn.get('amount', 0)
    hour = txn.get('transaction_time', 12)
    device = txn.get('device_type', 'Mobile')
    merchant = txn.get('merchant_category', 'Retail')

    # Simple logic to simulate fraud risk
    risk_score = 0.1  # baseline low risk

    if amount > 1000:
        risk_score += 0.5
    if hour < 6 or hour > 22:
        risk_score += 0.2
    if device == 'POS':
        risk_score += 0.1
    if merchant in ['Electronics', 'Luxury']:
        risk_score += 0.15

    risk_score = min(risk_score, 0.99)
    
    # Generate top mocked reason codes
    reasons = [
        ('Amount high', 0.4 if amount > 1000 else 0),
        ('Odd hour', 0.3 if hour < 6 or hour > 22 else 0),
        ('Merchant type risky', 0.25 if merchant in ['Electronics', 'Luxury'] else 0),
        ('Device type POS', 0.1 if device == 'POS' else 0),
    ]
    reasons = [r for r in reasons if r[1] > 0]

    return risk_score, reasons

def animate_card(is_fraud):
    # Animation by color pulse (simple)
    for _ in range(3):
        yield "animate_start"
        time.sleep(0.15)
        yield "animate_end"
        time.sleep(0.15)

def draw_manual_input():
    st.header("Manual Transaction Input")

    amount = st.slider("Transaction Amount ($)", 0, 5000, 250)
    transaction_time = st.selectbox("Transaction Time (Hour of Day)", list(range(24)), index=12)
    merchant_category = st.selectbox("Merchant Category", ['Retail', 'Food', 'Electronics', 'Luxury', 'Grocery'])
    device_type = st.selectbox("Device Type", ['Mobile', 'Web', 'POS'])

    if st.button("Predict Fraud Risk"):
        st.markdown("### Prediction Result:")

        risk_score, reasons = mock_predict({
            'amount': amount,
            'transaction_time': transaction_time,
            'merchant_category': merchant_category,
            'device_type': device_type
        })

        is_fraud = risk_score > 0.5

        # Animated card placeholder, approximate using color change on refresh
        card_color = '#f28b82' if is_fraud else '#81c995'
        card_icon = "⚠ Fraud Detected!" if is_fraud else "✅ Safe Transaction"
        pulse_style = f"""
            padding: 15px;
            border-radius: 10px;
            background-color: {card_color};
            color: white;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            animation: pulse 2s infinite;
        """
        st.markdown(f"<div style='{pulse_style}'>{card_icon}</div>", unsafe_allow_html=True)

        # Show risk score bar
        st.markdown(f"#### Fraud Likelihood: {risk_score*100:.1f}%")
        st.progress(risk_score)

        # Show top reason codes
        if reasons:
            st.markdown("**Top Fraud Risk Factors:**")
            for feat, val in reasons:
                st.write(f"- {feat} ({val*100:.0f}%)")
        else:
            st.write("Low risk detected; no significant risk factors.")

def draw_dataset_demo():
    st.header("Dataset Demo Mode: Upload CSV")

    uploaded_file = st.file_uploader("Upload a CSV file with transaction data (columns: amount, transaction_time, merchant_category, device_type)")
    if uploaded_file:
        try:
            df = pd.read_csv(uploaded_file)
            st.write("### Sample Data Preview")
            st.dataframe(df.head())

            # Basic fraud prediction on dataset with mock_predict
            def batch_predict(row):
                score, reasons = mock_predict({
                    'amount': row.get('amount', 0),
                    'transaction_time': row.get('transaction_time', 12),
                    'merchant_category': row.get('merchant_category', 'Retail'),
                    'device_type': row.get('device_type', 'Mobile')
                })
                return pd.Series({'fraud_score': score, 'is_fraud': score > 0.5})

            results = df.apply(batch_predict, axis=1)
            df = pd.concat([df, results], axis=1)

            fraud_count = df['is_fraud'].sum()
            total = len(df)
            st.write(f"### Fraudulent Transactions Detected: {fraud_count} / {total}")

            st.write("### Fraud Score Distribution")
            st.bar_chart(df['fraud_score'])

            # Top risk features for fraudulent transactions (mock)
            st.write("### Sample Fraud Risk Factors in Dataset")
            st.write("- High transaction amount")
            st.write("- Odd transaction times")
            st.write("- Risky merchant categories")
            st.write("- POS device usage")

        except Exception as e:
            st.error(f"Failed to read CSV: {e}")
    else:
        st.info("Upload a CSV file to see fraud detection demo.")

def draw_metrics_panel():
    st.sidebar.header("Live Metrics")
    st.sidebar.markdown("""
    - Precision@K: 92.5%
    - Alert Volume: 0.5% of transactions
    - True Positives (Last Hour): 12
    - False Positives (Last Hour): 1
    - Model Latency: 120ms avg
    - Drift Status: No drift detected
    """)

def main():
    st.title("Fraud Sentinel Demo — Interactive Fraud Detection")

    # Sidebar mode selector
    mode = st.sidebar.radio("Select Mode", ["Dataset Demo", "Manual Input"])

    draw_metrics_panel()

    if mode == "Manual Input":
        draw_manual_input()
    else:
        draw_dataset_demo()

if __name__ == "__main__":
    main()
