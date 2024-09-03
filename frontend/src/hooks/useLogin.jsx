import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      console.log(res);

      const json = res.data;

      // Save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // Redirect to the home page if login success
      navigate("/", { replace: true });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(
        error.response?.data?.error || "An error occurred during login."
      );
    }
  };

  return { login, isLoading, error };
};