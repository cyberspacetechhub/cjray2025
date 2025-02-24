
import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../shared/baseURL";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useUpdate from "../../../hooks/useUpdate";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import axios from "axios";


const AddProductModal = ({ open, handleClose }) => {
  const post = usePost();
  const update = useUpdate();
  const { auth } = useAuth();
  const url = `${baseUrl}product`;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);
  const uploadUrl = `${baseUrl}product/coverImage`;
  const [coverImageUrl, setCoverImageUrl] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth.accessToken}`
        }
      });
      setImageUrl(response.data.url);
      console.log(response)
      setValue('coverImage', response.data.url);
      setCoverImageUrl(true)
      reset()
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Image upload error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const createProduct = async (data) => {
    setIsLoading(true)
      const response = await post(url, data, auth?.accessToken);
      setTimeout(() => {
        setIsLoading(false)
        setCoverImageUrl(false)
        reset()
        handleClose();
      }, 3000);
      console.log(response.data)

  };

  const {mutate} = useMutation(createProduct,{

    onSuccess: ()=>{
      queryClient.invalidateQueries('products')
    }, onError: () => {
      setIsLoading(false)
    }
  })

  const handleCreateProduct = (lesson) => {

    mutate(lesson)

    toast.success('Lesson Created Successfully');

      setIsLoading(false)
     

  }

  
 // console.log(data)
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden mx-auto z-50 justify-center items-center w-4/5 md:w-2/4  h-modal md:h-full"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Product
              </h3>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={handleSubmit(handleCreateProduct)}>
              <div className="mb-4">
                <label
                  htmlFor="productCompany"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Cover Image
                </label>
                <input
                  name="file"
                  type="file"
                  className="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleImageChange}
                />
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name "
                    required=""
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">
                      Product Name is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="Quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    {...register("quantity")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type quantity"
                    required=""
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-400">
                     Product qauntity is required
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    {...register("price", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Product price"
                    required=""
                  />
                  {errors.price && (
                    <p className="text-sm text-red-400">
                      Product price is required
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="PurchasePrice"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Purchase Price <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="purchasePrice"
                    id="purchasePrice"
                    {...register("purchasePrice", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Product Purchase Price"
                    required=""
                  />
                  {errors.purchasePrice && (
                    <p className="text-sm text-red-400">
                      Product Purchase Price is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="productNo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product No. <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="productNo"
                    id="productNo"
                    {...register("productNo", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Product Product No."
                    required=""
                  />
                  {errors.productNo && (
                    <p className="text-sm text-red-400">
                      Product Product No. is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="productCompany"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Brand
                  </label>
                  <input
                    type="text"
                    name="productCompany"
                    id="productCompany"
                    {...register("productCompany")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Product Product Company."
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                   Product Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    {...register("category", { required: 'product category is required' })}
                    defaultValue={'default'}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option
                      disabled
                      value='default'
                    >
                      Select Product Categories
                    </option>
                    <option value="Smart Locks & Automation">Smart Homes & Automation</option>
                    <option value="Fire Safety & Protection">Fire Safety & Protection</option>
                    <option value="Creator's Light">Creator's Light</option>
                    <option value="Selfie Sticks & Tripods">Selfie Sticks & Tripods</option>
                    <option value="Lights and Lighting">Lights and Lighting</option>
                    <option value="General Merchandise">General Merchandise</option>
                  </select>

                  {errors.category && (
                    <p className="text-sm text-red-400">
                      {" "}
                      {errors.category?.message}{" "}
                    </p>
                  )}
                </div>
                {coverImageUrl && 
                  <div>
                  <label
                    htmlFor="coverImage"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Cover Image
                  </label>
                  <input
                    name="coverImage"
                    value={imageUrl}
                    {...register("coverImage")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // type="hidden"
                  />
                </div>
                }

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    {...register("description", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write product description here"
                  ></textarea>
                  {errors.description && (
                    <p className="text-sm text-red-400">
                      Prodcut description is required 
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="text-gray-600 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                 {isLoading ? <CircularProgress size="18px" style={{color: "green"}} />: "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
