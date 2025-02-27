import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import baseURL from "../../shared/baseURL";

const VerifyPage = () => {
    const [message, setMessage] = useState("Verifying your email...");
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setMessage("Invalid or missing token.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseURL}customer/verify?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setMessage("Email verified successfully! Redirecting to login...");
                    setTimeout(() => {
                        navigate("/");
                      }, 3000);
                } else {
                    setMessage(data.message || "Verification failed.");
                }
            } catch (error) {
                setMessage("Error verifying email. Please try again later.");
            }

            setLoading(false);
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-2xl font-bold">Email Verification</h1>
                <p className="text-gray-600 mt-2">{message}</p>
                {loading && <p className="text-blue-500 mt-4">Please wait...</p>}
            </div>
        </div>
    );
};

export default VerifyPage;
