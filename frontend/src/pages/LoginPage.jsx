import React, { useState, useContext } from "react";
import "./CSS/LoginPage.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            history.push("/dashboard");
        } catch (error) {
            console.error("Failed to login", error);
        }
    };

    return (
        <div className="container">
            <div class="logo">
                <img src="https://i.ibb.co/zP65hP1/logo.png" alt="Logo" />
            </div>
            <h1>Smart Pet Feeder</h1>
            <h2>Login</h2>

            <div className="login-box">
                <form id="loginForm" method="POST">
                    <input type="text" id="username" name="username" placeholder="Enter your username" required />
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;