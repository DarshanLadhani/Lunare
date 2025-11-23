import pandas as pd
import matplotlib.pyplot as plt
import os

df = pd.read_csv("orders.csv")

all_brands = []
for brand in df["Brands"]:
    order_brand_list = [b.strip() for b in brand.split(",")]
    all_brands.extend(order_brand_list)

brands_count = pd.Series(all_brands).value_counts()

plt.figure(figsize=(6,4))
plt.bar(brands_count.index , brands_count.values , color="skyblue")
plt.title("Orders per Brand")
plt.xlabel("Brand")
plt.ylabel("Number of Orders")
plt.show()

plt.figure(figsize=(6,4))
plt.pie(brands_count.values , labels=brands_count.index , autopct="%1.1f%%")
plt.title("Order Share by Brand")
plt.show()