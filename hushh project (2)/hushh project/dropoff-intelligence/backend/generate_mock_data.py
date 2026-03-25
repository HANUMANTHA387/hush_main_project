import os
import sys
import uuid
import random
from datetime import datetime, timedelta

# Ensure we can import backend packages
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import SessionLocal, engine
from backend.models import Base, UserEvent

def generate_synthetic_telemetry(num_users=2500):
    print(f"Initializing database and connecting...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Clear existing mock data if any
    db.query(UserEvent).delete()
    
    print(f"Generating {num_users} realistic synthetic sessions...")
    
    steps = ["Landing Page", "Signup Modal", "OTP Verification", "Profile Setup", "Completion"]
    devices = ["Desktop", "Mobile OS", "Tablet"]
    device_weights = [0.45, 0.45, 0.10]
    
    # Base timestamp starting 30 days ago
    base_time = datetime.now() - timedelta(days=30)
    
    events_to_insert = []
    
    for _ in range(num_users):
        session_id = f"usr_{uuid.uuid4().hex[:8]}"
        device = random.choices(devices, weights=device_weights)[0]
        
        # User spreads evenly across the 30 days
        session_start = base_time + timedelta(
            days=random.uniform(0, 30),
            hours=random.uniform(0, 24)
        )
        current_time = session_start
        
        # Determine how far they get through the funnel (Realistic Drop-off Logic)
        # Baseline transition probabilities
        transition_probs = {
            "Landing Page": 0.65,        # 35% bounce at Landing
            "Signup Modal": 0.55,        # 45% drop at Signup
            "OTP Verification": 0.80,    # 20% drop at OTP
            "Profile Setup": 0.90        # 10% drop at Profile
        }
        
        # Inject Device-specific friction (e.g. Mobile struggles at Profile Setup)
        if device == "Mobile OS":
            transition_probs["Profile Setup"] = 0.50 # 50% drop on mobile profile upload
        
        for step in steps:
            # Generate the event log for this step
            event_metadata = {}
            if step == "OTP Verification" and random.random() > 0.8:
                event_metadata["error"] = "sms_timeout"
            
            event = UserEvent(
                session_id=session_id,
                step_name=step,
                device_type=device,
                event_metadata=event_metadata,
                timestamp=current_time
            )
            events_to_insert.append(event)
            
            # Decide if they drop off before the next step
            if step != "Completion":
                if random.random() > transition_probs[step]:
                    break # User Dropped Off!
            
            # Sequence spacing (time spent on step)
            time_spent = random.uniform(15, 120)
            if step == "Profile Setup":
                time_spent += random.uniform(60, 300) # Takes longer
                
            current_time += timedelta(seconds=time_spent)
            
    print(f"Bulk inserting {len(events_to_insert)} raw telemetry events into the database...")
    db.bulk_save_objects(events_to_insert)
    db.commit()
    db.close()
    
    print("Synthetic Data Generation Complete! Database is populated and ready for ML Analysis.")

if __name__ == "__main__":
    generate_synthetic_telemetry()
