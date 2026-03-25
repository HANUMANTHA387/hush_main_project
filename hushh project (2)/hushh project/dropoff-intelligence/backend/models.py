from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from database import Base

class UserEvent(Base):
    """
    Event logging table representing real-time telemetry from the frontend.
    This acts as the source of truth for the data ingestion pipeline.
    """
    __tablename__ = "user_events"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True, nullable=False)
    step_name = Column(String, index=True, nullable=False)
    device_type = Column(String, index=True)
    
    # Stores dynamic payload like time_spent on previous step, errors, clicks
    event_metadata = Column(JSON, nullable=True) 
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
