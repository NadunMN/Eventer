import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Create the useAuthContext hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
