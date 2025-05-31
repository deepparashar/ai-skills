import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AppContext = createContext()


export const AppProvider = ({children}) => {
   
     const [token, setToken] = useState(localStorage.getItem("token"));
      const [authUser, setAuthUser] = useState(null);
      const navigate = useNavigate()
      const [loading, setLoading] = useState(true);




      // Check if user is authenticated and setup socket
 const checkAuth = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const { data } = await axios.get("/api/auth/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setAuthUser(data.user);
    }
  } catch (error) {
    console.error("Auth Error:", error.response?.data || error.message);
  } finally {
    setLoading(false); // ✅ Stop loading whether success or error
  }
};

  
  // Login user & connect socket
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Login failed");
      }
    }
      catch (error) {
  console.error("Login error:", error);
  toast.error(error.response?.data?.message || "Something went wrong");
}

  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    checkAuth();
  }, [token]);


    const value = {
      axios, login, setAuthUser, authUser, checkAuth, loading
    }
  
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}