import random
import datetime

# --- Feature Engineering Module ---
def extract_session_features(events):
    """
    Transforms raw DB telemetry events into an ML feature vector.
    """
    if not events:
        return {"time_spent": 0, "step_depth": 0, "error_count": 0}
    
    # Aggregate timeline
    start_time = min(e.timestamp for e in events)
    end_time = max(e.timestamp for e in events)
    duration_sec = (end_time - start_time).total_seconds() if end_time else 0
    
    return {
        "time_spent": duration_sec,
        "step_depth": len(set(e.step_name for e in events)),
        "error_count": sum(1 for e in events if e.event_metadata and e.event_metadata.get("error"))
    }

# --- Model Inference Pipeline ---
def predict_session_churn(session_id: str, events: list):
    """
    Simulates a scikit-learn / PyTorch inference pipeline natively without PIP locking the user.
    Uses mathematical heuristics mapping the engineered features to probabilities.
    """
    features = extract_session_features(events)
    
    # Simulated Logistic Regression weights
    W_time = 0.02
    W_depth = -0.5
    W_error = 1.2
    bias = -1.5
    
    z = bias + (features["time_spent"] * W_time) + (features["step_depth"] * W_depth) + (features["error_count"] * W_error)
    prob_scaled = 1 / (1 + __import__('math').exp(-z))
    
    # Behavioral Clustering Inference
    cluster = "Fast Users"
    action = "Monitor"
    
    if prob_scaled > 0.75:
        cluster = "Drop-Prone"
        action = "Simplify Form Flow & Add Social Login"
    elif prob_scaled > 0.4:
        cluster = "Confused"
        action = "Add Tooltips & Reduce Input Fields"
        
    return {
        "churn_probability": prob_scaled,
        "behavioral_cluster": cluster,
        "recommended_action": action
    }
