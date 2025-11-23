from fastapi import APIRouter , HTTPException , Request
from models.products_models import ProductModel 
from controllers.products_controllers import get_product , get_products , get_search_products  , add_product , update_product , delete_product

router = APIRouter(prefix='/products' , tags=["Products"])

@router.post('/')
async def create_product(product_data : ProductModel):
    new_product = await add_product(product_data)
    return new_product

@router.get('/')
async def read_products():
    products = await get_products()
    return products

@router.post('/search')
async def read_search_products(request : Request , filters_data : dict = None):
    query = request.query_params.get("query")
    if not query:
        raise HTTPException(status_code=400 , detail="Query is Missing")
    products = await get_search_products(query.lower().strip() , filters_data)
    return products

@router.get('/{product_id}')
async def read_product(product_id : str):
    product = await get_product(product_id)
    if not product:
        raise HTTPException(status_code=404 , detail="Product not found")
    return product

@router.put('/{product_id}')
async def updated_existing_product_details(product_id : str , product_data : ProductModel):
    updated_product = await update_product(product_id , product_data)
    if not updated_product:
        raise HTTPException(status_code=404 , detail="Product not found")
    return updated_product

@router.delete('/{product_id}')
async def delete_existing_product(product_id : str):
    deleted_product = await delete_product(product_id)
    return deleted_product


