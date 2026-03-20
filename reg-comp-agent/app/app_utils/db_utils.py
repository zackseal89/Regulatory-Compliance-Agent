import os
from google.cloud import firestore
from google.cloud import aiplatform

# Initialize Firestore
db = firestore.Client(project=os.environ["GOOGLE_CLOUD_PROJECT"])

def save_regulatory_update(data: dict):
    """Saves a processed regulatory update to Firestore."""
    return db.collection("regulatory_updates").add(data)

def get_client_profile(client_id: str):
    """Retrieves client profile data."""
    doc = db.collection("client_profiles").document(client_id).get()
    return doc.to_dict() if doc.exists else None

def log_materiality_determination(determination: dict):
    """Logs the agent's reasoning and score."""
    return db.collection("materiality_determinations").add(determination)
