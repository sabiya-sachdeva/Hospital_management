from pymongo import MongoClient
import json

# 1. Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")  # Replace if needed
db = client["hospitalmanagement"]

# 2. Select the collection
collection = db["patientschemas"]  # Match your collection name in MongoDB

# 3. Read backup JSON file
with open("backup/PatientSchema_backup.json", "r") as f:
    data = json.load(f)

# 4. Optional: Clear current collection before restoring
collection.delete_many({})  # WARNING: This deletes all current documents

# 5. Insert backup data into MongoDB
collection.insert_many(data)

print(f"Restore completed for PatientSchema collection. {len(data)} documents inserted.")

# 6. Close connection
client.close()