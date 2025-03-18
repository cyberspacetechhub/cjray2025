import React, { useEffect, useState, useContext } from "react";
import baseURL from "../../shared/baseURL";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SignIn = ({ open, dispatch }) => {
  const { auth, setAuth, persist, setPersist } = useContext(AuthContext);
  const url = `${baseURL}auth/login`;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is on "/login" page
  const isStandalonePage = location.pathname === "/auth/signin";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const login = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status !== 200) throw new Error("Network response was not ok");

      setAuth(response.data);
      toast.success("Login successful. Redirecting...");
      setTimeout(() => {
        const role = response.data?.user?.type || response.data?.roles;
        switch (role) {
          case "Customer":
            navigate("/dashboard");
            break;
          case "Agent":
            navigate("/agent");
            break;
          case "Owner":
            navigate("/owner");
            break;
          default:
            navigate("/unauthorized");
        }
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      const status = error.response?.status;
      if (status === 400) toast.error("Invalid email or password");
      else if (status === 401) toast.error("Invalid credentials");
      else toast.error("Something went wrong, try again later");
    }
  };

  const togglePersist = () => setPersist((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const SignInForm = (
    <div className="">
      <ToastContainer />

      {/* Close button for the modal */}
      {
          !isStandalonePage && (
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "openLogin" });
              }}
              className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 border border-gray-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
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
          )
        }

      <h1 className="text-xl font-bold text-gray-800 md:text-2xl text-center">Sign In</h1>
      <p className="text-center text-gray-600">Sign in to continue</p>
      <form onSubmit={handleSubmit(login)} className="mt-4">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...register("email", { required: true })}
            className="block w-full p-2 border rounded"
            placeholder="Enter Email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            {...register("password", { required: true })}
            className="block w-full p-2 border rounded"
            placeholder="********"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="form-checkbox h-4 w-4 text-green-600"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <button
            onClick={() => {
              if (!isStandalonePage) dispatch({ type: "openLogin" });
              navigate("/forgotpassword");
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Sign In"}
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <button
          onClick={() => {
            if (!isStandalonePage) {
              dispatch({ type: "openLogin" });
              dispatch({ type: "register" });
            } else {
              navigate("/register");
            }
          }}
          className="text-green-600 underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );

  if (isStandalonePage) {
    return (
      <div
        className=" justify-center items-center w-full outline-none "
      >
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-svh ">
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 max-h-screen pb-10">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {SignInForm}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal open={open} onClose={() => dispatch({ type: "openLogin" })}>
       <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-10  z-50 justify-center items-center w-full outline-none "
      >
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 h-svh ">
          <div className="relative w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 overflow-y-auto max-h-screen pb-10">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {SignInForm}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignIn;
