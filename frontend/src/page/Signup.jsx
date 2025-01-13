import React from "react";
import Template from "../component/Auth/Template";
import signupImg from "../assets/Images/signup.png";

const SignUp = () => {
    return (
        <Template
            title="Plan Your Perfect Event with Us"
            description1="Create Unforgettable Experiences."
            description2="Expert event management powered by precision and creativity."
            image={signupImg}
            formType="signup"
        />
    );
};

export default SignUp;
