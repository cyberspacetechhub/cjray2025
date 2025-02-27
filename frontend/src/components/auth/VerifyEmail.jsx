import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../shared/baseURL";
import { ToastContainer, toast } from "react-toastify";

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold">
        {isVerified ? "Email Verified! Redirecting to login..." : "Verify your email to continue"}
      </h2>
      {!isVerified && <p>Check your email inbox for a verification link.</p>}
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
