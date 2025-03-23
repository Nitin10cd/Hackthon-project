import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./Popup.css";
import { useAppContext } from "../../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = () => {
    const [isRegister, setIsRegister] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate(); 
    const { setUser, setIsLoggedIn } = useAppContext();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegister
            ? `http://localhost:3000/api/users/register`
            : `http://localhost:3000/api/users/login`;

        try {
            const response = await axios.post(endpoint, formData);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setUser({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    id: response.data.user.id,
                    token: response.data.token
                });

                toast.success(response.data.success);
                setIsLoggedIn(true);

                navigate("/home");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="auth-popup">
            <form onSubmit={handleSubmit} className="auth-popup-container">
                <div className="auth-popup-title">
                    <h2>{isRegister ? "Sign Up" : "Login"}</h2>
                </div>

                <div className="auth-popup-input">
                    {isRegister && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">{isRegister ? "Create Account" : "Login"}</button>

                <p>
                    {isRegister ? "Already have an account? " : "Create a new account? "}
                    <span onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "Login here" : "Sign up"}
                    </span>
                </p>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPopup;
