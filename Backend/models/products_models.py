from typing import Optional, List
from pydantic import BaseModel , Field

class ProductModel(BaseModel):
    name : str = Field(... , title = "Clothing Item Name" , max_length = 100)
    brand : str = Field(... , title = "Brand Name" , max_length = 100)
    description : str = Field(... , title = "Description"  , max_length = 1000 )
    price : float = Field(... , title = "Original Price" , gt=0 )
    discountedprice : Optional[float] = Field(None , title = "Discounted Price" , ge = 0 )
    sizes: Optional[List[str]] = Field(None , title="Available Product Sizes")
    color: str = Field(..., title = "Color Name")
    gender: str = Field(..., title="Target Gender")
    instock : bool = Field(True , title = "Is product in stock ?")
    quantity : int = Field(... , title = "Total quantity of product" , ge=0 )
    isoffer : bool = Field(False , title = "Is product on offer ?")
    imageurls : List[str] = Field(... , title = "Product Image URLs")
    category : str = Field(... , title = "Product Category")
    material : str = Field(... , title = "Product Material")
    searchkeywords : List[str] = Field(... , title="Keywords To Search  Products")
    productaddedtocart : Optional[bool] = Field(False , title="Is product Added to Cart ?")

class CartProductModel(BaseModel):
    product_id : str = Field(..., title="Product ID")
    name : str = Field(... , title = "Clothing Item Name" , max_length = 100)
    brand : str = Field(... , title = "Brand Name" , max_length = 100)
    price : float = Field(... , title = "Original Price" , gt=0 )
    discountedprice : Optional[float] = Field(None , title = "Discounted Price" , ge = 0 )
    productquantity : Optional[int] = Field(1 , title = "Total quantity of product" , ge=1 )
    color: str = Field(..., title = "Color Name")
    imageurl : str = Field(... , title = "Product Image URLs")
    selectedsize : Optional[str] = Field("" , title="User selected size")
    quantity : int = Field(... , title = "Total quantity of product" , ge=0 )




 

