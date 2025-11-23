from fastapi import APIRouter , HTTPException , Request
from models.products_models import CartProductModel
from controllers.cart_controllers import add_to_cart, delete_from_cart , get_from_cart, update_product_quantity_in_cart , delete_all_products_from_cart

router = APIRouter(prefix='/cart' , tags=["Products"])

@router.get('/')
async def read_cart_products():
    products = await get_from_cart()
    return products

@router.delete('/delete')
async def delete_all_cart_products():
    response = await delete_all_products_from_cart()
    return response

@router.delete('/delete/{id}')
async def delete_cart_products(id : str):
    response = await delete_from_cart(id)
    return response


@router.post('/add')
async def add_cart_products(cart_product_data : CartProductModel):
    response = await add_to_cart(cart_product_data)
    return response

@router.put('/update/quantity/{product_id}')
async def update_cart_products_quantity(product_id : str , request : Request):
    body = await request.json()
    productquantity = body["productquantity"]
    response = await update_product_quantity_in_cart(product_id , productquantity )
    return response