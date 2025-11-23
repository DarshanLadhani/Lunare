def product_helper(product) -> dict:
    return {
        "id" : str(product["_id"]),
        "name" : product.get("name"),
        "brand" : product.get("brand"),
        "description" : product.get("description"),
        "price" : product.get("price"),
        "discountedprice" : product.get("discountedprice"),
        "sizes" : product.get("sizes"),
        "color" : product.get("color"),
        "gender" : product.get("gender"),
        "instock" : product.get("instock"),
        "quantity" : product.get("quantity"),
        "isoffer" : product.get("isoffer"),
        "imageurls" : product.get("imageurls"),
        "category" : product.get("category"),
        "material" : product.get("material"),
        "searchkeywords" : product.get("searchkeywords"),
        "productaddedtocart" : product.get("productaddedtocart"),
        "createdat" : product.get("createdat")
    }

def cart_helper(product) -> dict:
    return {
        "id" : str(product["_id"]),
        "product_id" : product.get("product_id"),
        "name" : product.get("name"),
        "brand" : product.get("brand"),
        "price" : product.get("price"),
        "discountedprice" : product.get("discountedprice"),
        "color" : product.get("color"),
        "productquantity" : product.get("productquantity"),
        "imageurl" : product.get("imageurl"),
        "selectedsize" : product.get("selectedsize"),
        "quantity" : product.get("quantity")
    }