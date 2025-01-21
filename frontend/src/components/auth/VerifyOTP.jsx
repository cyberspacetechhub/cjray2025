import React, { useState, useRef, useEffect } from "react";
import { CircularProgress, Modal } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "react-query";
import baseUrl from "../../shared/baseURL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePost from "../../hooks/usePost";

const VerifyOTP = ({ otpLength = 4 , open, dispatch}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [codeError, setCodeError] = useState("");
  const [timeLeft, setTimeLeft] = useState(100);
  const [resend, setResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const verifyUrl = `${baseUrl}sms/verifyotp`
  const resendUrl = `${baseUrl}sms/otp`;
  const url = `${baseUrl}customer`;
  const inputsRef = useRef([]);
  const post = usePost();
  const { code, setCode, userData } = useAuth();

   const handleChange = (element, index) => {
     const value = element.value;
     if (/^[0-9]$/.test(value) || value === "") {
       const newOtp = [...otp];
       newOtp[index] = value;
       setOtp(newOtp);

       // Focus on next input
       if (value && index < otpLength - 1) {
         inputsRef.current[index + 1].focus();
       }

       // If backspace is pressed and input is empty, focus on previous input
       if (value === "" && index > 0) {
         inputsRef.current[index - 1].focus();
       }
     }
   };

   const handleKeyDown = (e, index) => {
     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
       inputsRef.current[index - 1].focus();
     }
   };

  const handleSubmit = async () => {
    setIsLoading(true);
    const pin = otp.join("");

    try {
      const response = await post(verifyUrl, { pin, pinId: code.pinId });
      if (response.status == 200) {
        handleCreateAccount(userData);
      }

    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false);
    }

  };

  useEffect(() => {
    let timer;

    if (timeLeft > 0) {
      setResend(false); // Ensure button is hidden during countdown
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setResend(true); // Show the button when the timer stops
    }

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft]);

  const resendOtp = async () => {
    setCodeError("");
    setResend(false)
    setTimeLeft(100)
    try {
      const verificationData = { phone: userData.phone, email: userData.email };
      const response = await post(resendUrl, verificationData, "");
      setCode(response.data?.response);

      console.log(response);
    } catch (error) {
      if (error.status === 409) {
        setCodeError("Phone Number or Email already exist");
      } else if (error.status === 400) {
        setCodeError(error.response?.data?.message);
      } else if (error.status === 500) {
        setCodeError(" Error Sending OTP");
      }
    } 

  };

  const createAccount = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    try {
      const response = await post(url, formData);
      if (response.status == 201) {
        setIsLoading(false);

      }
      //console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
      throw new Error("Failed to create account");
      
    }finally{
      setIsLoading(false);
    }
  };
  const { mutate } = useMutation(createAccount, {
    onSuccess: () => {
      toast.success("Account created successfully");
      setTimeout(() => {
        dispatch({ type: "verify" });
        dispatch({ type: "openLogin" });
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateAccount = (data) => {
    mutate(data);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch({ type: "verify" });
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-14 md:top-0  z-50 justify-center items-center  w-full  h-auto "
      >
        <ToastContainer />
        <div className="relative p-4 w-full h-auto  ">
          <section className=" h-screen flex justify-center items-center ">
            <div className="flex flex-col items-center bg-white text-gray-700 w-3/4 md:w-2/4 pb-4 rounded-xl">
              <div className="flex justify-end items-center p-4 w-full ">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "verify" });
                  }}
                  className="text-gray-700 bg-transparent hover:bg-gray-800 hover:text-gray-900 rounded-full border-2 border-gray text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <h2 className="text-2xl font-semibold mb-4">
                Verify Phone Number{" "}
              </h2>
              <p className="text-darkHover dark:text-gray px-3 text-center">
                Please Enter the code sent to your <br />{" "}
                <span className="font-bold">Phone Number</span>{" "}
              </p>
              <div className="flex justify-center items-center space-x-2 m-4 px-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="text-center rounded-lg text-gray-900"
                  />
                ))}
              </div>
              {codeError && (
                <p className="text-redborder text-sm"> {`${codeError}, `}</p>
              )}

              {resend && (
                <p className="text-gray-800 dark:text-primary pb-6">
                  {" "}
                  You no see the code ?{" "}
                  <button
                    onClick={() => resendOtp(regData.PhoneNumber)}
                    className="text-background"
                  >
                    <span className="text-green-600 cursor-pointer font-bold">
                      Oya Resend am!
                    </span>
                  </button>{" "}
                </p>
              )}
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white dark:text-accent font-semibold rounded-lg shadow hover:bg-background transition duration-200"
              >
                {" "}
                {isLoading ? <CircularProgress /> : "Proceed "}
              </button>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyOTP;
