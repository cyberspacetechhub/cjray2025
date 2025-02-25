import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  
  // Determine available storage (localStorage or sessionStorage as fallback)
  const storage = (() => {
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      return localStorage;
    } catch (error) {
      console.warn("LocalStorage unavailable, using sessionStorage.");
      return sessionStorage;
    }
  })();

  // ✅ Function to safely retrieve persisted values
  const getPersistValue = () => {
    try {
      return JSON.parse(storage.getItem("persist")) || false;
    } catch (error) {
      console.warn("Error reading persist from storage:", error);
      return false;
    }
  };

  const getAuthData = () => {
    try {
      return JSON.parse(storage.getItem("auth")) || { user: null, token: "" };
    } catch (error) {
      console.warn("Error reading auth from storage:", error);
      return { user: null, token: "" };
    }
  };

  // ✅ State Hooks  
  const [auth, setAuth] = useState(getAuthData());
  const [persist, setPersist] = useState(getPersistValue());
  const [forgotPassword, setForgotPassword] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [code, setCode] = useState({});
  const [changePassword, setChangePassword] = useState(false);

  // ✅ Effect to persist auth state changes  
  useEffect(() => {
    try {
      storage.setItem("auth", JSON.stringify(auth));
    } catch (error) {
      console.warn("Could not save auth:", error);
    }
  }, [auth]);

  // ✅ Effect to persist `persist` state changes  
  useEffect(() => {
    try {
      storage.setItem("persist", JSON.stringify(persist));
    } catch (error) {
      console.warn("Could not save persist:", error);
    }
  }, [persist]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        forgotPassword,
        setForgotPassword,
        verifyOTP,
        setVerifyOTP,
        changePassword,
        setChangePassword,
        code,
        setCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
