import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../shared/baseURL";
import { ToastContainer, toast } from "react-toastify";
import { Mail } from "@mui/icons-material";

const VerifyEmail = ({ dispatch }) => {
  const [isVerified, setIsVerified] = useState(false);
  const email = localStorage.getItem("pendingVerificationEmail");

  useEffect(() => {
    if (!email) {
      return;
    }

    const checkVerification = async () => {
      try {
        const response = await axios.get(`${baseURL}check?email=${email}`);
        if (response.data.verified) {
          setIsVerified(true);
          localStorage.removeItem("pendingVerificationEmail");

          toast.success("Email verified! You can now log in.");
          
          // Open login modal after delay
          setTimeout(() => {
            dispatch({ type: "openLogin" });
          }, 2000);
        }
      } catch (error) {
        console.error("Error checking verification:", error);
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(checkVerification, 5000);
    return () => clearInterval(interval);
  }, [email, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-purple-600" viewBox="0 -960 960 960" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Check your inbox, please!</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Hey Joy, to start using our service, we need to verify your email. We’ve already sent out the verification link.
          Please check it and confirm it’s really you.
        </p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg text-sm hover:bg-blue-600 transition">
          Go to Inbox!
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Didn’t get an e-mail? <span className="text-blue-500 cursor-pointer hover:underline">Send it again</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
