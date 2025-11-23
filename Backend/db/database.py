from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI) # Use your mongodb uri 

try:
    client.admin.command("ping")
    print("Connected to MongoDB Successfully!")
except ConnectionFailure:
    print("Failed to Connect to MongoDB")
except Exception as e:
    print("Error:", e)

db = client.cartify
products_collection = db.products
cart_collection = db.cart
orders_collection = db.orders
