from fastapi import HTTPException , status
from utils.product_helper import cart_helper
from db.database import cart_collection , products_collection
from models.products_models import CartProductModel
from bson import ObjectId
from datetime import datetime , timezone

async def get_from_cart():
    try:
        cart_products = []
        async for product in cart_collection.find():
            cart_products.append(cart_helper(product))
        return cart_products
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in fetching cart products : {str(e)}")

async def add_to_cart(cart_product_data : CartProductModel):
    try:
        product_dict = cart_product_data.model_dump()
        product_dict["addedtocart"] = datetime.now(timezone.utc)
        
        
        result = await cart_collection.insert_one(product_dict)
        
        if (result.acknowledged):
            return {"message" : "Product Added To Cart Successfully" , "status" : 200 , "success" : True }
        
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in adding product to cart : {str(e)}")

async def delete_from_cart(id : str):
    try:
        if not ObjectId.is_valid(id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid product ID format")
        
        result = await cart_collection.delete_one({"_id" : ObjectId(id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Cart Product not found")
        
        return {"message" : "Product deleted Successfully" , "status" : 200 , "success" : True }
    except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in deleting cart product : {str(e)}")
    
async def update_product_quantity_in_cart(id : str , productquantity : int):
    try:
        if not ObjectId.is_valid(id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid product ID format")
        
        product = await cart_collection.update_one({"_id" : ObjectId(id)} , {"$set" : {"productquantity" : productquantity}})

        if product.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Cart Product not found")
        
        return {"message" : "Product Quantity updated Successfully" , "status" : 200 , "success" : True }

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in updating cart product : {str(e)}")

async def delete_all_products_from_cart():
    try:
        result = await cart_collection.delete_many({})

        if result.acknowledged:
            return {"message" : "All products deleted successfully" , "status" : 200 , "success" : True }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in  deleting all cart products : {str(e)}")
    
