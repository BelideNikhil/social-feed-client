import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { apiClient } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get("/auth/me");
        if (response?.status === 200) {
          setUser(response?.data?.user);
        }
      } catch (error) {
        console.log("fetch me", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const loginHandler = async (e, formData) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiClient.post("/auth/login", formData);

      if (response?.status === 201) {
        const origin = location?.state?.from?.pathname ?? "/feed";
        setUser(response?.data?.user);
        setIsLoading(false);
        navigate(origin, { replace: true });
      }
    } catch (error) {
      console.log("login error", error);
      setIsLoading(false);
    }
  };

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiClient.post("/auth/signup", formData);
      if (response?.status === 201) {
        setUser(response?.data?.user);
        setIsLoading(false);
        navigate("/feed", { replace: true });
      }
    } catch (error) {
      console.log("signup error", error);
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      if (response?.status === 200) {
        setUser(null);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, loginHandler, signupHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
