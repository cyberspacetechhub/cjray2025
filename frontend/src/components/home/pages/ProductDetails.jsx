import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import baseUrl from "../../../shared/baseURL";
import { useQuery } from "react-query";
import { useCart } from "../../../context/CartContext";

const ProductDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const url = `${baseUrl}product`;

  const getProduct = async () => {
    const result = await fetch(`${url}/${id}`, auth.accessToken);
    return result.data;
  };

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery(["product", id], getProduct, {
    keepPreviousData: true,
    staleTime: 10000,
    refetchOnMount: "always",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ✅ Set selectedImage when product is available
  useEffect(() => {
    if (product?.coverImage) {
      setSelectedImage(product.coverImage);
    }
  }, [product]);

  return (
    <div className="pt-10">
      <div className="px-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>

      {isLoading && (
        <div className="p-6">
          <div className="w-full h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <p className="text-center text-gray-500 mt-4">Loading product...</p>
        </div>
      )}

      {product && (
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Image Section */}
          <div className="md:w-1/2 md:sticky md:top-0 md:self-start">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product?.name || "Product Image"}
                loading="lazy"
                onLoad={() => setImageLoaded(true)} // Update state when image loads
                className={`w-full h-96 object-cover rounded-md mb-4 transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* ✅ Show skeleton loader until image is loaded */}
              {!imageLoaded && (
                <div className="w-full h-96 bg-gray-300 animate-pulse rounded-md mb-4"></div>
              )}
            </div>

            {/* Image thumbnails */}
            <div className="flex gap-4 mt-4 overflow-x-auto">
              {product?.imageUrls?.map((img, index) => (
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

          {/* Product Details */}
          <div className="md:w-1/2 p-4">
            <h2 className="text-3xl font-bold text-gray-900">{product?.name}</h2>
            <p className="text-2xl font-semibold text-gray-700 mt-2">
              &#8358;{product?.price.toLocaleString("en-US")}
            </p>

            {/* Category, Brand, Product Number */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Category:</h3>
              <p className="text-gray-700">{product?.category}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Brand:</h3>
              <p className="text-gray-700">{product?.productCompany}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Product No.:</h3>
              <p className="text-gray-700">{product?.productNo}</p>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">Description:</h3>
              <p className="text-gray-700 mt-2">{product?.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700">Quantity</label>
              <div className="flex items-center gap-4 border rounded-md p-2 w-28">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-lg">
                  +
                </button>
              </div>
            </div>

            {/* Stock Info */}
            {product?.quantity > 0 ? (
              <div className="mt-4 flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-700">IN STOCK</span>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                <span className="text-sm text-gray-700">OUT OF STOCK</span>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="w-full mt-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
