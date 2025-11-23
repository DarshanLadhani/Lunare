from fastapi import APIRouter , HTTPException , Request
from models.orders_models import Order
from controllers.orders_controllers import create_order

router = APIRouter(prefix='/orders' , tags=["Orders"])

@router.post('/')
async def create_products_order(order_data : Order):
    order = await create_order(order_data)
    return order
