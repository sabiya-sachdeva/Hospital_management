from pymongo import MongoClient
import json
import os
import pandas as pd

# 1. Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017")  # Replace with your MongoDB URI if different
db = client["hospitalmanagement"]  # Replace with your DB name

# 2. Select the PatientSchema collection
collection = db["patientschemas"]  # Your appointments collection

# 3. Backup folder
backup_folder = "backup"
if not os.path.exists(backup_folder):
    os.makedirs(backup_folder)

# 4. Fetch all documents
data = list(collection.find())
print(f"Documents found: {len(data)}")

# 5. Convert ObjectId to string for JSON serialization
if data:
    for doc in data:
        if "_id" in doc:
            doc["_id"] = str(doc["_id"])


        # optional:

    df = pd.DataFrame(data)

 # 7. Export to CSV
    backup_file = f"{backup_folder}/PatientSchema_backup.csv"
    df.to_csv(backup_file, index=False)

    


# 6. Write to JSON file
# backup_file = f"{backup_folder}/PatientSchema_backup.json"
# with open(backup_file, "w") as f:
#     json.dump(data, f, indent=4)

print(f"Backup completed for PatientSchema collection. File saved at: {backup_file}")

# 7. Close MongoDB connection
client.close()