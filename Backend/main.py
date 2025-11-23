from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.products_routes import router as product_router
from routes.cart_routes import router as cart_router
from routes.orders_routes import router as order_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],              
)

app.include_router(product_router)
app.include_router(cart_router)
app.include_router(order_router)



