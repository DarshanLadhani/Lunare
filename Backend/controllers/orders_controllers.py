from fastapi import HTTPException, status
from db.database import orders_collection
from models.orders_models import Order
from datetime import datetime, timezone
import os
import pandas as pd

rootdirpath = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csvdirpath = os.path.join(rootdirpath , "analysis")
os.makedirs(csvdirpath , exist_ok=True)
csvfilepath = os.path.join(csvdirpath , "orders.csv")

async def create_order(order_data: Order):
    try:

        order_dict = order_data.model_dump()
        order_dict["createdat"] = datetime.now(timezone.utc)

        result = await orders_collection.insert_one(order_dict)

        if result.acknowledged:
            order_dict["_id"] = str(result.inserted_id)
            append_order_to_csv(order_dict)
            return {"message": "Order Created Successfully", "status": 200, "success": True}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error in creating the order : {str(e)}"
        )

def append_order_to_csv(order_dict):

    row = {
        "Order ID": order_dict["_id"],
        "Total Amount": order_dict["totalamount"],
        "Created At": order_dict["createdat"],
        "Product IDs": ",".join([item["product_id"] for item in order_dict["items"]]),
        "Names": ",".join([item["name"] for item in order_dict["items"]]),
        "Brands": ",".join([item["brand"] for item in order_dict["items"]]),
        "Quantities": ",".join([str(item["productquantity"]) for item in order_dict["items"]]),
        "Prices": ",".join([str(item["price"]) for item in order_dict["items"]])
    }

    new_df = pd.DataFrame([row])

    if not os.path.exists(csvfilepath) or os.path.getsize(csvfilepath) == 0:
        new_df.to_csv(csvfilepath, index=False, encoding="utf-8")
    else:
        new_df.to_csv(csvfilepath, mode="a", header=False, index=False, encoding="utf-8")




