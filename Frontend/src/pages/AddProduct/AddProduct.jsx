import { AddProductForm } from "../../components"

function AddProduct() {
  return (
    <div className="py-8">
      <h1 className="font-satoshi-medium text-xl px-4 mb-4 md:text-2xl lg:text-3xl xl:text-4xl lg:px-16 xl:px-32">ADD PRODUCT</h1>
      <AddProductForm/>
    </div>
  )
}

export default AddProduct