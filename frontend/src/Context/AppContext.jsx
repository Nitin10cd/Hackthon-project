import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const url = "http://localhost:3000/api";
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser

  const [user, setUser] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser);
  const [loading, setLoading] = useState(false);
  const [interviewQuestionType, setInterviewQuestionType] = useState("");
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/user`);
      setUser(response.data);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const contextValues = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    logout,
    interviewQuestionType,
    setInterviewQuestionType,
    reportData,
    setReportData,
  };

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
