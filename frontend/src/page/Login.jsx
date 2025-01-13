import React from "react";
import loginImg2 from "../assets/Images/login.png";
import Template from "../component/Auth/Template";

const Login = () => {
    return (
        <Template
            title="Welcome Back to EventCraft"
            description1="Continue Crafting Unforgettable Events."
            description2="Log in to manage your events with precision and ease."
            image={loginImg2}
            formType="login"
        />
    );
};

export default Login;
