import { DownArrowIcon, UploadImageIcon } from '../../assets'
import { useRef, useState } from 'react'
import axios from 'axios';
import uploadOnCloudinary from '../../utils/cloudinary';
import { Loader } from "../../components"

function Addproductform() {

    const imageInputRef1 = useRef()
    const imageInputRef2 = useRef()
    const imageInputRef3 = useRef()
    const imageInputRef4 = useRef()

    const [selectedImage1, setSelectedImage1] = useState(null)
    const [selectedImage2, setSelectedImage2] = useState(null)
    const [selectedImage3, setSelectedImage3] = useState(null)
    const [selectedImage4, setSelectedImage4] = useState(null)

    const [selectedCategory, setSelectedCategory] = useState("");
    const [productOnOffer, setProductOnOffer] = useState("No");
    const [productinStock, setProductInStock] = useState("Yes");
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableMaterials, setAvailableMaterials] = useState([]);

    const [loading, setLoading] = useState(false);

    const materials = {
        clothing: ["Cotton", "Linen", "Silk", "Wool", "Cashmere", "Velvet", "Satin", "Denim", "Leather", "Tweed", "Chiffon", "Organza", "Polyester", "Nylon", "Rayon"],
        footwear: ["Leather", "Suede", "Patent Leather", "Nubuck", "Mesh", "Knit Fabric", "Velvet", "Canvas", "Rubber", "EVA Foam"],
        bags: ["Leather", "Suede", "Canvas", "Nylon", "Patent Leather", "Exotic Leather", "Denim", "Velvet", "Raffia", "Jacquard Fabric"],
        shoes: ["Leather", "Suede", "Patent Leather", "Velvet", "Satin", "Canvas", "Mesh", "Rubber", "Cork", "Raffia"],
        accessories: ["Leather", "Acetate", "Metal", "Titanium", "Silk", "Gold", "Silver", "Wool", "Cotton", "Nylon"],
        activewear: ["Polyester", "Nylon", "Elastane", "Cotton", "Polyamide", "Mesh"]
    };

    const handleSelectedCategory = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedSizes([]);
        setAvailableMaterials([])
        if (category === 'Clothing') {
            setAvailableSizes(['S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
            setAvailableMaterials(materials.clothing);
            return;
        }

        if (category === 'Activewear') {
            setAvailableSizes(['S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
            setAvailableMaterials(materials.activewear);
            return;
        }

        if (category === 'Footwear') {
            setAvailableSizes(['6', '7', '8', '9', '10', '11', '12']);
            setAvailableMaterials(materials.footwear);
            return;
        }

        if (category === 'Accesories') {
            setAvailableSizes([]);
            setAvailableMaterials(materials.accessories)
            return;
        }

        if (category === 'Bags') {
            setAvailableSizes([]);
            setAvailableMaterials(materials.bags)
            return;
        }
    }

    const handleProductOnOffer = (e) => {
        const value = e.target.value;

        if (value === "true") {
            setProductOnOffer("Yes")
        } else {
            setProductOnOffer("No")
        }
    }

    const handleProductInStock = (e) => {
        const value = e.target.value;

        if (value === "false") {
            setProductInStock("No")
        } else {
            setProductInStock("Yes")
        }
    }

    const handleOnSelectedSizeChange = (e) => {
        const value = e.target.value;

        if (value === 'ALL') {
            if (selectedCategory === 'Clothing' || selectedCategory === 'Activewear') setSelectedSizes(['S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
            else if (selectedCategory === 'Footwear') setSelectedSizes(['6', '7', '8', '9', '10', '11', '12']);
            return;
        }
        if (selectedSizes.includes(value)) {
            setSelectedSizes(prev => prev.filter(size => size !== value));
        } else {
            setSelectedSizes(prev => [...prev, value])
        }
    }

    const clickOnImageInput = (e) => {
        const id = e.currentTarget.id;

        if (id === "image1container") {
            imageInputRef1.current.click()
            console.log(imageInputRef1.current)
        } else if (id === "image2container") {
            imageInputRef2.current.click()
            console.log(imageInputRef2.current)
        } else if (id === "image3container") {
            imageInputRef3.current.click()
            console.log(imageInputRef3.current)
        } else if (id === "image4container") {
            imageInputRef4.current.click()
            console.log(imageInputRef4.current)
        }

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        let imageUrl = null
        if (file) {
            imageUrl = URL.createObjectURL(file);
        }

        if (e.target.name === "image1") {
            setSelectedImage1(imageUrl);
        }
        if (e.target.name === "image2") {
            setSelectedImage2(imageUrl);
        }
        if (e.target.name === "image3") {
            setSelectedImage3(imageUrl);
        }
        if (e.target.name === "image4") {
            setSelectedImage4(imageUrl);
        }
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const form = e.target;


        const productData = {
            name: form.name.value,
            brand: form.brand.value,
            description: form.description.value,
            price: parseFloat(form.price.value),
            discountedprice: form.discountedprice.value ? parseFloat(form.discountedprice.value) : 0,
            color: form.color.value,
            gender: form.gender.value,
            category: form.category.value,
            material: form.material.value,
            instock: form.instock.value === "true",
            isoffer: form.isoffer.value === "true",
            quantity: form.quantity.value ? parseInt(form.quantity.value) : 0,
            description: form.description.value,
            sizes: selectedSizes,
        }

        const searchkeywordslist = [];

        form.searchkeywords.value.split(",").forEach(word => {
            searchkeywordslist.push(word.toLowerCase().trim())
        });

        productData["searchkeywords"] = searchkeywordslist

        const imageUrls = [];

        console.log(imageInputRef1.current.files[0]);
        console.log(imageInputRef2.current.files[0]);
        console.log(imageInputRef3.current.files[0]);
        console.log(imageInputRef4.current.files[0]);

        if (imageInputRef1.current.files[0]) {
            const cloudinaryImageURL1 = await uploadOnCloudinary(imageInputRef1.current.files[0]);
            imageUrls.push(cloudinaryImageURL1)
        }
        if (imageInputRef2.current.files[0]) {
            const cloudinaryImageURL2 = await uploadOnCloudinary(imageInputRef2.current.files[0]);
            imageUrls.push(cloudinaryImageURL2)
        }
        if (imageInputRef3.current.files[0]) {
            const cloudinaryImageURL3 = await uploadOnCloudinary(imageInputRef3.current.files[0]);
            imageUrls.push(cloudinaryImageURL3)
        }
        if (imageInputRef4.current.files[0]) {
            const cloudinaryImageURL4 = await uploadOnCloudinary(imageInputRef4.current.files[0]);
            imageUrls.push(cloudinaryImageURL4)
        }

        productData["imageurls"] = imageUrls;

        setLoading(true)

        try {
            console.log("Product Data : ", productData)
            const response = await axios.post('http://127.0.0.1:8000/products/', productData);

            if (response.data) {
                console.log(response.data)
                setTimeout(() => setLoading(false), 500)
            }

        } catch (error) {
            console.log("Erorr : ", error)
        }
    }

    if (loading) {
        return (
            <Loader message='Adding product...' fullscreen />
        )
    }

    return (
        <div className='px-4 lg:px-16 xl:px-32'>
            <form onSubmit={handleAddProduct} className="border-2 border-black/10 grid sm:grid-cols-2 p-2 lg:p-4">
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="name" className="font-satoshi-medium block text-lg xl:text-xl">Name</label>
                    <input type="text" className='outline-none px-4 py-2 lg:py-3  w-full border-2 border-black/60 font-satoshi-regular xl:text-lg' name="name" placeholder="Ex. Oversized Tshirt" id="name" required />
                </div>
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="brand" className="font-satoshi-medium block text-lg xl:text-xl">Brand Name</label>
                    <input type="text" className='outline-none px-4 py-2 lg:py-3  w-full border-2 border-black/60 font-satoshi-regular xl:text-lg' name="brand" placeholder="Ex. H & M" id="brand" required />
                </div>
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="price" className="font-satoshi-medium block text-lg xl:text-xl">Price</label>
                    <input type="number" className='outline-none px-4 py-2 lg:py-3  w-full border-2 border-black/60 font-satoshi-regular xl:text-lg' name="price"
                        placeholder="Ex. 5000 Rs." id="price" required />
                </div>
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="color" className="font-satoshi-medium block text-lg xl:text-xl">Color</label>
                    <input type="text" className="outline-none px-4 py-2 lg:py-3  w-full border-2 border-black/60 font-satoshi-regular xl:text-lg" name="color" placeholder="Ex. Beige" id="color" />
                </div>
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="gender" className="font-satoshi-medium block text-lg xl:text-xl">Target Gender</label>
                    <div className='relative'>
                        <select id="gender" name="gender" placeholder="setLoading" className="outline-none appearance-none px-4 py-2 lg:py-3  w-full  border-2 border-black/60  font-satoshi-regular xl:text-lg">
                            <option value="" defaultValue>Select Gender</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                        <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
                            <img src={DownArrowIcon} className='opacity-70' alt="" />
                        </div>
                    </div>
                </div>
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="category" className="font-satoshi-medium block text-lg xl:text-xl">Category</label>
                    <div className='relative'>
                        <select name="category" id="category" onChange={handleSelectedCategory} className="outline-none appearance-none px-4 py-2 lg:py-3  w-full  border-2 border-black/60 font-satoshi-regular xl:text-lg">
                            <option value="" defaultValue>Select Category</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Activewear">Activewear</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Bags">Bags</option>
                            <option value="Footwear">Footwear</option>
                        </select>
                        <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
                            <img src={DownArrowIcon} className='opacity-70' alt="" />
                        </div>
                    </div>
                </div>
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="isoffer" className="font-satoshi-medium block text-lg xl:text-xl">On Offer</label>
                    <div className='relative'>
                        <select id="isoffer" name="isoffer" onChange={handleProductOnOffer} className="outline-none appearance-none px-4 py-2 lg:py-3  w-full  border-2 border-black/60 font-satoshi-regular xl:text-lg">
                            <option value="true">Yes</option>
                            <option value="false" selected>No</option>
                        </select>
                        <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
                            <img src={DownArrowIcon} className='opacity-70' alt="" />
                        </div>
                    </div>
                </div>
                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="discountedprice" className="font-satoshi-medium block text-lg xl:text-xl">Discounted Price</label>
                    <input type="number" className={`outline-none px-4 py-2 lg:py-3  w-full border-2 ${productOnOffer === 'Yes' ? 'border-black/60' : 'border-black/20'} font-satoshi-regular xl:text-lg`} name="discountedprice"
                        placeholder="Ex. 2500 Rs." id="discountedprice" disabled={productOnOffer === 'Yes' ? false : true} />
                </div>

                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="instock" className="font-satoshi-medium block text-lg xl:text-xl">In Stock</label>
                    <div className='relative'>
                        <select id="instock" name="instock" onChange={handleProductInStock} className="outline-none appearance-none px-4 py-2 lg:py-3  w-full  border-2 border-black/60 font-satoshi-regular xl:text-lg">
                            <option value="true" selected>Yes</option>
                            <option value="false">No</option>
                        </select>
                        <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
                            <img src={DownArrowIcon} className='opacity-70' alt="" />
                        </div>
                    </div>
                </div>

                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="quantity" className="font-satoshi-medium block text-lg xl:text-xl">Quantity</label>
                    <input type="number" className={`outline-none px-4 py-2 lg:py-3  w-full border-2 ${productinStock === 'Yes' ? 'border-black/60' : 'border-black/20'} font-satoshi-regular xl:text-lg' name="quantity`}
                        placeholder="Ex. 50" id="quantity" disabled={productinStock === 'Yes' ? false : true} />
                </div>


                <div className='p-2 space-y-2 lg:p-4'>
                    <label className="font-satoshi-medium text-lg xl:text-xl flex gap-x-2">
                        <span>Available Sizes</span>
                        {selectedCategory ? (
                            availableSizes.length > 0 ? (
                                <div className='space-x-2'>
                                    <button onClick={() => setSelectedSizes(availableSizes)} className=' border-2 border-black/60 text-sm  px-2 '>Select All</button>
                                    <button onClick={() => setSelectedSizes([])} className=' border-2 border-black/60 text-sm px-2 '>Clear</button>
                                </div>
                            ) : ""
                        ) : ("")
                        }
                    </label>
                    <div className=' border-2 border-black/60 px-4 py-2 lg:py-3  flex flex-col justify-between xl:text-lg'>
                        <div className='flex justify-between gap-y-2'>
                            {selectedCategory ?
                                (availableSizes.length > 0 ? (
                                    availableSizes.map((size) => (
                                        <label key={size} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                value={size}
                                                checked={selectedSizes.includes(size)}
                                                onChange={handleOnSelectedSizeChange}
                                                className="accent-black w-5 h-5"
                                            />
                                            <span className="font-satoshi-regular">{size}</span>
                                        </label>
                                    ))
                                ) : (<p className='text-black/60 text-center w-full'>No available sizes for this category.</p>)
                                )
                                : <p className='text-black/60 text-center w-full'>Select any category to get available sizes.</p>
                            }

                        </div>
                    </div>
                </div>

                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="material" className="font-satoshi-medium block text-lg xl:text-xl">Material</label>
                    <div className='relative'>
                        <select name="material" id="material" className="outline-none appearance-none px-4 py-2 lg:py-3  w-full  border-2 border-black/60 font-satoshi-regular xl:text-lg">
                            <option value="" selected>Select Material</option>
                            {
                                availableMaterials.map((material) => (
                                    <option key={material} value={material}>{material}</option>
                                ))
                            }
                        </select>
                        <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
                            <img src={DownArrowIcon} className='opacity-70' alt="" />
                        </div>
                    </div>
                </div>

                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="description" className="font-satoshi-medium block text-lg xl:text-xl">Description</label>
                    <textarea type="text" className='outline-none resize-none px-4 py-2 lg:py-3  w-full h-34 xl:h-36  border-2 border-black/60 font-satoshi-regular xl:text-lg' name="description"
                        placeholder="Ex. Stylish , durable men's oversized tshirt." id="description" required />
                </div>

                <div className="p-2 space-y-2 lg:p-4">
                    <label htmlFor="searchkeywords" className="font-satoshi-medium block text-lg xl:text-xl">Search Keywords</label>
                    <textarea type="text" className='outline-none resize-none px-4 py-2 lg:py-3  w-full h-34 xl:h-36  border-2 border-black/60 font-satoshi-regular xl:text-lg' name="searchkeywords"
                        placeholder="Ex. Shirt,Shirts,Gucci Men Shirt,Gucci Mens Shirts,Shirts For Men,Oversized Shirt,Knitted Shirt" id="searchkeywords" required />
                </div>

                {/* Images  */}
                <div className='p-2 space-y-2 lg:p-4'>
                    <label htmlFor="image" className="font-satoshi-medium block text-lg sm:text-center xl:text-xl">Image 1</label>
                    <input ref={imageInputRef1} type="file" accept='image/*' onChange={handleImageChange} className="hidden" name="image1" id="image1" required />
                    <div onClick={clickOnImageInput} id='image1container' className={`w-full lg:w-4/5 sm:mx-auto h-[500px] md:h-[550px] lg:h-[600px] ${selectedImage1 ? 'border-0' : 'border-2'} border-black/60 font-satoshi-regular space-y-4 ${selectedImage1 ? '' : 'flex items-center justify-center'}`}>
                        {
                            selectedImage1 ?
                                <img src={selectedImage1} className='w-full h-[500px] md:h-[550px] lg:h-[600px]  object-cover' alt="" />
                                : <img src={UploadImageIcon} className='w-30 h-30 opacity-70' />
                        }

                    </div>
                    <p className='text-center text-sm xl:text-base text-black/60'>Click above to add or update the image.</p>
                </div>
                <div className='p-2 space-y-2 lg:p-4'>
                    <label htmlFor="image" className="font-satoshi-medium block text-lg sm:text-center xl:text-xl">Image 2</label>
                    <input ref={imageInputRef2} type="file" accept='image/*' onChange={handleImageChange} className="hidden" name="image2" placeholder="Ex. Beige" id="image2" required />
                    <div onClick={clickOnImageInput} id="image2container" className={`w-full lg:w-4/5 sm:mx-auto h-[500px] md:h-[550px] lg:h-[600px] ${selectedImage2 ? 'border-0' : 'border-2'} border-black/60 font-satoshi-regular space-y-4 ${selectedImage2 ? '' : 'flex items-center justify-center'}`}>
                        {
                            selectedImage2 ?
                                <img src={selectedImage2} className='w-full h-[500px] md:h-[550px] lg:h-[600px]  object-cover' alt="" />
                                : <img src={UploadImageIcon} className='w-30 h-30 opacity-70' />
                        }

                    </div>
                    <p className='text-center text-sm xl:text-base text-black/60'>Click above to add or update the image.</p>
                </div>
                <div className='p-2 space-y-2 lg:p-4'>
                    <label htmlFor="image" className="font-satoshi-medium block text-lg sm:text-center xl:text-xl">Image 3</label>
                    <input ref={imageInputRef3} type="file" accept='image/*' onChange={handleImageChange} className="hidden" name="image3" placeholder="Ex. Beige" id="image3" required />
                    <div onClick={clickOnImageInput} id="image3container" className={` w-full lg:w-4/5  sm:mx-auto h-[500px] md:h-[550px] lg:h-[600px] ${selectedImage3 ? 'border-0' : 'border-2'} border-black/60 font-satoshi-regular space-y-4 ${selectedImage3 ? '' : 'flex items-center justify-center'}`}>
                        {
                            selectedImage3 ?
                                <img src={selectedImage3} className='w-full h-[500px] md:h-[550px] lg:h-[600px]  object-cover' alt="" />
                                : <img src={UploadImageIcon} className='w-30 h-30 opacity-70' />
                        }

                    </div>
                    <p className='text-center text-sm xl:text-base text-black/60'>Click above to add or update the image.</p>
                </div>
                <div className='p-2 space-y-2 lg:p-4'>
                    <label htmlFor="image" className="font-satoshi-medium block text-lg sm:text-center xl:text-xl">Image 4</label>
                    <input ref={imageInputRef4} type="file" accept='image/*' onChange={handleImageChange} className="hidden" name="image4" placeholder="Ex. Beige" id="image4" required />
                    <div onClick={clickOnImageInput} id="image4container" className={`w-full lg:w-4/5 sm:mx-auto h-[500px] md:h-[550px] lg:h-[600px] ${selectedImage4 ? 'border-0' : 'border-2'} border-black/60 font-satoshi-regular space-y-4 ${selectedImage4 ? '' : 'flex items-center justify-center'}`}>
                        {
                            selectedImage4 ?
                                <img src={selectedImage4} className='w-full  h-[500px] md:h-[550px] lg:h-[600px]  object-cover' alt="" />
                                : <img src={UploadImageIcon} className='w-30 h-30 opacity-70' />
                        }

                    </div>
                    <p className='text-center text-sm xl:text-base text-black/60'>Click above to add or update the image.</p>
                </div>

                <div className='p-2 sm:col-span-2 flex justify-center text-lg'>
                    <button type='submit' className='border-2 border-black/60 px-4 py-2 w-full sm:w-1/2 md:w-4/10 '>Add Product</button>
                </div>
            </form>
        </div>
    )
}

export default Addproductform