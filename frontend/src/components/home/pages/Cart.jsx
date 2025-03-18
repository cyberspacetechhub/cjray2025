import { toast } from "react-toastify";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  console.log(auth)
  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 border">
              <div>
                <h2 className="text-lg">{item.name}</h2>
                <p>₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
              <div>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span className="px-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 mt-4">
            Clear Cart
          </button>
          <button
            onClick={() => {
              if (!auth?.user?._id || !auth?.user?.role !== "Customer" || cart.length === 0) {
                if (cart.length === 0) {
                  toast.error("Cart is empty");
                } else {
                  navigate('/auth/signin')
                }
              } else {
                navigate("/checkout");
              }
            }}
            className="bg-green-500 text-white px-4 py-2 mt-4 ml-4"
            >
            Proceed to Checkout
          </button>

        </>
      )}
    </div>
  );
};

export default Cart;
