from pydantic import BaseModel , Field
from typing import List , Optional
from datetime import datetime

class OrderItem(BaseModel):
    product_id : str = Field(..., title="Product ID")
    name : str = Field(... , title = "Clothing Item Name" , max_length = 100)
    brand : str = Field(... , title = "Brand Name" , max_length = 100)
    productquantity : Optional[int] = Field(1 , title = "Total quantity of product" , ge=1 )
    price : float = Field(... , title = "Original Price" , gt=0 )
    discountedprice : Optional[float] = Field(None , title = "Discounted Price" , ge = 0 )
    imageurl : str
    selectedsize : Optional[str] = Field("" , title="User selected size")

class Order(BaseModel):
    items: List[OrderItem] = Field(... , title="List of items in one order")
    totalamount : float = Field(... , title = "Total Amount of the order" , gt=0 )
    # payment_method: str = "COD"          # 'COD' or 'Online'
    # payment_status: str = "Pending"      # 'Pending', 'Paid', 'Failed'
    # order_status: str = "Processing"     # 'Processing', 'Shipped', 'Delivered', etc.