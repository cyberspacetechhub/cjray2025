import { useForm } from "react-hook-form";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../shared/baseURL";
import usePost from "../../../hooks/usePost";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const url = `${baseURL}order`;
  const post = usePost();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to get the price properly
  const getPrice = (item) => {
    if (typeof item.price === "object" && item.price.$numberDecimal) {
      return parseFloat(item.price.$numberDecimal);
    }
    return parseFloat(item.price) || 0;
  };

  // Calculate Total Amount
  const totalAmount = cart.reduce(
    (acc, item) => acc + getPrice(item) * item.quantity,
    0
  );

  // Handle Checkout Submission
  const onSubmit = async (data) => {
    const orderData = {
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: getPrice(item),
        quantity: item.quantity,
      })),
      totalAmount,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    const response = await post(url, orderData);
    console.log(response);

    if (response.ok) {
      clearCart();
      navigate("/order-success");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Display Cart Items */}
      {cart.length > 0 ? (
        <div className="mb-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b p-2">
              <p className="text-lg">{item.name}</p>
              <p className="text-lg font-semibold">
                ₦{(getPrice(item) * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3 className="text-xl font-semibold mt-4">
        Total: ₦{totalAmount.toLocaleString()}
      </h3>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
       <div>
        <label htmlFor="fullname">Fullname</label>
        <input
          type="text"
          name="fullname"
          {...register("fullname", { required: "Fullname is required" })}
          placeholder="Enter Fullname"
          className="border p-2 w-full mt-2"
        />
        {errors.fullname && (
          <p className="text-red-500">{errors.fullname.message}</p>
        )}
       </div>

       <div>
        <label htmlFor="address">Shipping Address</label>
        <input
          type="text"
          name="address"
          {...register("address", { required: "Address is required" })}
          placeholder="Enter shipping address"
          className="border p-2 w-full mt-2"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
       </div>
       <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"  
          name="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter Email"
          className="border p-2 w-full mt-2"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
       </div>
       <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          {...register("phone", { required: "Phone is required" })}
          placeholder="Enter Phone"
          className="border p-2 w-full mt-2"
        />
        {errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}
       </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
