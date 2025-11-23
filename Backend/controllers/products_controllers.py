from fastapi import HTTPException , status
from utils.product_helper import product_helper , cart_helper
from db.database import products_collection
from models.products_models import ProductModel
from bson import ObjectId
from datetime import datetime , timezone

# Admin Controllers

async def add_product(product_data : ProductModel):
    try:
        product_dict = dict(product_data)
        product_dict["createdat"] = datetime.now(timezone.utc)

        result = await products_collection.insert_one(product_dict)
        new_product = await products_collection.find_one({"_id" : result.inserted_id})
        return product_helper(new_product)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in creating product : {str(e)}")

async def get_products():
    try:
        products = []
        async for product in products_collection.find():
            products.append(product_helper(product))
        return products
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in fetching products : {str(e)}")

async def update_product(product_id  : str , product_data : ProductModel):
    try:
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid product ID format")
        
        product_dict = dict(product_data)
        product_dict["image_url"] = str(product_dict["image_url"])
        updated_result = await products_collection.update_one({"_id" : ObjectId(product_id)} , {"$set" : product_dict})

        if updated_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Product not found or no changes made")
        
        updated_product = await products_collection.find_one({"_id" : ObjectId(product_id)})
        return product_helper(updated_product)
    
    except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in updating product : {str(e)}")

async def delete_product(product_id : str):
    try:
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid product ID format")
        
        result = await products_collection.delete_one({"_id" : ObjectId(product_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Product not found")
        
        return {"message" : "Product deleted successfully"}
    except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in updating product : {str(e)}")

# user Controllers
    
async def get_search_products(query : str , filters_data : dict = None):
    try:

        products = []
        filters = []

        print(filters_data)
        print(query)

        if filters_data:
            gender = filters_data.get("gender")

            if gender:
                filters.append({"term" : {"query" : gender , "path" : "gender"}})

            category = filters_data.get("category")
            if category:
                if isinstance(category, list):
                    if len(category) == 1:
                        filters.append({"term": {"query": category[0], "path": "category"}})
                    elif len(category) > 1:
                        filters.append({ "in": {"path": "category", "value": category}})
                else:
                    filters.append({"term": {"query": category, "path": "category"}
            })
        

        if filters:
            pipeline = [{
                "$search": {
                    "index": "product_search_index",
                    "compound": {
                        "must": [
                            {"text": {"query": query,"path": ["name", "brand", "searchkeywords"]}}
                        ],
                        "filter" : filters
                    }
                }
            }]
        else:
            pipeline = [{
                "$search" : {
                    "index" : "product_search_index",
                        "text" : {"query" : query, "path" : ["name", "brand", "searchkeywords"]}
                }
            }]

        async for product in products_collection.aggregate(pipeline):
             products.append(product_helper(product))
        return products
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in fetching products : {str(e)}")

async def get_product(product_id : str):
    try:
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid product ID format")
        
        product = await products_collection.find_one({"_id" : ObjectId(product_id)})

        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Product not found")
        
        return product_helper(product)
    except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , detail=f"Error in fetching product : {str(e)}")



 



