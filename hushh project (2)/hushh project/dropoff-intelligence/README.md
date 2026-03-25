# AI-Powered Drop-Off Detection & User Lifecycle Intelligence System

A production-ready, full-stack analytics platform built to track user behavior in multi-step signup flows, detect drop-off friction points, predict churn, and provide actionable real-time recommendations.

## Project Architecture

The system is cleanly decoupled into two scalable layers:

### 1. Interactive Frontend Dashboard (Pure HTML/JS/CSS)
Located in the project root, the premium, responsive dashboard operates entirely via vanilla Web Technologies, meaning it requires zero build steps (no Webpack, Node, or NPM needed) and natively renders a spectacular glassmorphism interface.

*   `index.html`: The structural layout containing the live Funnel, Active Sessions, and A/B Test modules.
*   `styles.css`: The bespoke CSS design system.
*   `app.js`: The real-time visual controller, DOM manipulator, and UI state manager.
*   `ml-engine.js`: A custom-built, in-browser mathematical Machine Learning engine running Logistic Regression and K-Means Clustering for live inference rendering.

### 2. Fast & Scalable Backend (FastAPI + Python + SQLAlchemy)
Located in the `backend/` directory, this layer exposes the API for permanent telemetry ingestion and heavyweight ML Python logic.

*   `main.py`: The FastAPI application exposing `/api/v1/events` and `/api/v1/predict` routes.
*   `models.py` & `database.py`: SQLAlchemy setup mapping an event-sourcing system to a PostgreSQL (or SQLite default) database.
*   `schemas.py`: Pydantic structural validation enforcing data integrity.
*   `ml_pipeline.py`: The core backend AI/ML feature engineering and churn prediction module simulating PyTorch/SciKit-learn pipelines without dependency bloat.
*   `generate_mock_data.py`: A specialized chron-script to mass-generate highly realistic user datasets.

## Deployment & Execution

### Running the Frontend
The frontend is completely standalone. Simply double-click `index.html` anywhere or open it in your browser. It automatically boots the real-time simulation so you can immediately view the dynamic data and UI without running the backend!

### Running the Backend

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Python Dependencies**:
   Ensure you have Python 3 installed.
   ```bash
   pip install -r requirements.txt
   ```

3. **Generate the Synthetic Sample Dataset**:
   Run the CLI tool to mass-populate thousands of realistic session sequences and drop-off behaviors into the internal database.
   ```bash
   python generate_mock_data.py
   ```

4. **Boot the FastAPI Production Server**:
   ```bash
   uvicorn main:app --reload
   ```

## Features Delivered
*   **Real-time Funnel Tracking**: Identify where users drop off dynamically.
*   **A/B Testing Simulator**: Compare optimized flows vs old flows live.
*   **Automated Re-Engagement Engine**: Contextually trigger "Mock Emails" based on the exact drop-off steps identified.
*   **Machine Learning Output**: Segregates Active Sessions into behavioral cohorts ('Confused', 'Drop-Prone') via K-Means and attaches a mathematically calculated risk percentage via Logistic Regression.
