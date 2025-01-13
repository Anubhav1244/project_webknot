import React from "react";
import instructor from "../../assets/Images/6c8d5573-228a-4dc8-84b9-c7a6baab961a.jpeg";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
    return (
        <div className="mt-16">
            <div className="flex lg:flex-row flex-col gap-20 items-center">
                <div className="lg:w-[50%] w-[80%]">
                    <img
                        src={instructor}
                        alt="eventCoordinatorImage"
                        className="border-[20px] border-richblack-25"
                        width={450}
                    />
                </div>
                <div className="flex flex-col lg:w-[50%] w-[80%] justify-center gap-10">
                    <div className="md:text-4xl text-3xl font-semibold justify-center">
                        <h2>Become an</h2>
                        <HighlightText text={"Event Coordinator"}></HighlightText>
                    </div>
                    <p className="text-richblack-300 font-medium w-[82%]">
                        Join a global community of event coordinators and planners 
                        who create unforgettable experiences. At EventCraft, we 
                        provide the resources, tools, and support to help you plan 
                        and execute events that leave a lasting impression.
                    </p>
                    <div className="w-fit mt-2">
                        <CTAButton
                            active={true}
                            shadow={true}
                            linkto={"/signup"}
                        >
                            <div className="flex flex-row justify-center items-center gap-2">
                                Start Planning Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructor;
