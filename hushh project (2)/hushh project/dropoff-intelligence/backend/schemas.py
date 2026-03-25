from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime

# --- Data Ingestion Schemas ---

class EventCreate(BaseModel):
    session_id: str = Field(..., description="Unique ID for the user's current funnel attempt")
    step_name: str = Field(..., description="The UI step the user just hit (e.g. 'OTP Verification')")
    device_type: str = Field(default="Desktop")
    event_metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Extra telemetry like time_spent or errors")

class EventResponse(EventCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# --- API Response Schemas ---

class PredictionResponse(BaseModel):
    session_id: str
    churn_probability: float = Field(..., description="Percentage likelihood of churning at current step [0.0 - 1.0]")
    behavioral_cluster: str = Field(..., description="ML segmented cohort name")
    recommended_action: str = Field(..., description="Tactical fix suggested by the engine")

class SessionTimeStat(BaseModel):
    time: str
    sessions: int

class DropoffStepStat(BaseModel):
    step: str
    drop: int

class ConversionStat(BaseModel):
    name: str
    value: int
    color: str

class OTPFailureStat(BaseModel):
    reason: str
    count: int

class ServerLatencyStat(BaseModel):
    time: str
    latency: int

class TimePerStageStat(BaseModel):
    stage: str
    time: int
    avg: int

class DAUStat(BaseModel):
    day: str
    active: int
    new: int

class DeviceStat(BaseModel):
    name: str
    value: int
    color: str

class RegionStat(BaseModel):
    region: str
    users: int

class ProfileCompletionStat(BaseModel):
    bin: str
    users: int

class AnalyticsResponse(BaseModel):
    sessionsTimeData: List[SessionTimeStat]
    dropoffStepData: List[DropoffStepStat]
    conversionData: List[ConversionStat]
    otpFailuresData: List[OTPFailureStat]
    serverLatencyData: List[ServerLatencyStat]
    timePerStageData: List[TimePerStageStat]
    dauData: List[DAUStat]
    deviceData: List[DeviceStat]
    regionData: List[RegionStat]
    profileCompletionDist: List[ProfileCompletionStat]
