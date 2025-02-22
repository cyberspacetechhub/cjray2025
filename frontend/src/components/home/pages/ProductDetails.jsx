import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Cctv1 from '../../../assets/images/cctv1.jpg'
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import baseUrl from '../../../shared/baseURL';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const ProductDetails = () => {
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseUrl}product`
  const { id } = useParams();
  const navigate = useNavigate();
  const {addToCart} = useCart();

  const getProduct = async () => {
    const result = await fetch(`${url}/${id}`, auth.accessToken);

    return result.data;
  };

  const { data:product, isError, isLoading, isSuccess } = useQuery(
    ["product", id],
    getProduct,
    {   
        keepPreviousData: true, 
        staleTime: 10000,
        refetchOnMount:"always" 
      }
  );

  console.log(product)

  const [selectedImage, setSelectedImage] = useState(product?.coverImage);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className='pt-10'>
      <div className='px-6'>
        <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </div>
      {
        product &&
        <div className="flex flex-col md:flex-row gap-8 p-6">
        {/* Image Section */}
        <div className="md:w-1/2 md:sticky md:top-0 md:self-start">
          <div className="w-full rounded-lg overflow-hidden">
          <img
            src={selectedImage}
            alt={product?.name || "Product Image"}
            loading="lazy"
            onLoad={() => setImageLoaded(true)} // Update state when image is loaded
            className={`w-full h-96 object-cover rounded-t-md mb-4 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          />

            {/* Show a skeleton while loading */}
            {!imageLoaded && <div className="w-full h-40 bg-gray-300 animate-pulse rounded-t-md mb-4"></div>}
          </div>
  
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {product?.imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
  
        {/* Product Details Section */}
        <div className="md:w-1/2 p-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{product?.name}</h2>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-2">
          &#8358;{parseFloat(product?.price.$numberDecimal).toLocaleString("en-US")}
        </p>
        {/* <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Shipping calculated at checkout.</p> */}

        <div className="mt-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category: </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {product?.category}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Brand: </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {product?.productCompany}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product No.: </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {product?.productNo}
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description: </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {product?.description}
          </p>
        </div>

        {/* <div className="mt-6">
          <h3 className="text-lg font-semibold text-red-600">UPGRADE THE STORAGE</h3>
          <label className="flex items-center gap-2 mt-2">
            <input type="radio" name="storageUpgrade" className="w-4 h-4" />
            Upgrade to 512GB SSD +&#8358;40,000.00
          </label>
          <label className="flex items-center gap-2 mt-2">
            <input type="radio" name="storageUpgrade" className="w-4 h-4" />
            Upgrade to 1TB SSD +&#8358;90,000.00
          </label>
        </div> */}

        {/* Quantity Selector */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700">Quantity</label>
          <div className="flex justify-center items-center gap-4 border rounded-md p-2 w-28">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="text-lg">-</button>
            <span className="text-lg">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="text-lg">+</button>
          </div>
        </div>

        {/* Stock Info */}
        {
          product.quantity > 0 ? (
            <div className="mt-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-700">IN STOCK</span>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span className="text-sm text-gray-700">OUT OF STOCK</span>
            </div>
          )
        }

        {/* Notice */}
        <p className="mt-4 text-red-600 text-sm font-medium">
          !Payment on delivery within Ughelli Delta State Only
        </p>
        <p className="mt-2 bg-gray-100 p-2 text-sm text-gray-600 rounded-md">
          If you have any questions or concerns, please contact our customer <Link className='underline text-blue-600'>support</Link>?.
        </p>

        {/* Add to Cart Button */}
        <button onClick={() => addToCart(product)} className="w-full mt-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition">
          Add to cart
        </button>
      </div>
      </div>
      }
    </div>
  )
}

export default ProductDetails