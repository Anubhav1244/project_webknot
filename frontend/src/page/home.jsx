import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../component/HomePage/HighlightText";
import CTAButton from "../component/HomePage/CTAButton";
import CodeBlocks from "../component/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4";
import InstructorSection from "../component/HomePage/InstructorSection";

import FooterSection from "../component/common/FooterSection";

const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between text-white">
                <Link to={"/signup"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-medium text-[16px] text-richblack-200 transition-all duration-200 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-richblack-800 hover:scale-95 hover:drop-shadow-none">
                        <div className="flex flex-row gap-2 items-center rounded-full px-[18px] py-[6px] duration-200 transition-all group-hover:bg-richblack-900">
                            <p>Become a Partner</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                <div className="text-center md:text-4xl text-3xl font-semibold mt-7">
                    Crafting
                    <HighlightText text={" Memorable Events "} />
                    with Excellence.
                </div>

                <div className="text-richblack-300 md:text-lg text-base font-medium w-[90%] mt-4 text-center">
                    At EventCraft, we specialize in designing and managing unforgettable events. 
                    From corporate gatherings to weddings and private celebrations, our team 
                    ensures every detail is handled with precision and care.
                </div>

                <div className="flex flex-row mt-12 gap-6">
                    <CTAButton active={true} linkto={"/signup"}>
                        Get Started!
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Consultation
                    </CTAButton>
                </div>

                <div className="mt-16 shadow-[0px_-5px_40px_#4299e1]">
                    <video
                        muted
                        autoPlay
                        loop
                        src={Banner}
                        type="video/mp4"
                        className="h-fit"
                    ></video>
                </div>

                {/* CodeBlock 1 */}
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className="md:text-4xl text-3xl font-semibold">
                            Create Unforgettable
                            <HighlightText text={" Experiences "} />
                            with Our Expert Team.
                        </div>
                    }
                    subheading={
                        "Our event management services are tailored to meet your unique needs. Whether it’s a wedding, corporate event, or private celebration, we bring your vision to life."
                    }
                    ctabtn1={{
                        btnText: "Plan Your Event",
                        linkto: "/plan-event",
                        active: true,
                    }}
                    ctabtn2={{
                        btnText: "Learn More",
                        linkto: "/services",
                        active: false,
                    }}
                    codeblock={`
                        Welcome to EventCraft! We specialize in crafting unforgettable events tailored to your unique needs. 
                        Whether you're planning a grand wedding, an elegant corporate gathering, or a cozy private celebration, 
                        our team of experts will handle every detail with precision and care. 
                    `}
                    codeColor="text-yellow-500"
                ></CodeBlocks>

                {/* CodeBlock 2 */}
                <CodeBlocks
                    position={"lg:flex-row-reverse lg:mt-0 mt-[-30px]"}
                    heading={
                        <div className="md:text-4xl text-3xl font-semibold">
                            Plan Events with
                            <HighlightText text={" Ease and Precision "} />
                        </div>
                    }
                    subheading={
                        "Experience a seamless planning process with our expert team, ensuring every detail of your event is perfectly executed."
                    }
                    ctabtn1={{
                        btnText: "Start Planning",
                        linkto: "/signup",
                        active: true,
                    }}
                    ctabtn2={{
                        btnText: "Contact Us",
                        linkto: "/contact",
                        active: false,
                    }}
                    codeblock={`Welcome to EventCraft! We are dedicated to creating events that leave lasting impressions, customized to reflect your vision. 
                         Whether it's a sophisticated wedding, a seamless corporate function, or a personalized private event, 
                        our team of professionals ensures every element is thoughtfully executed to perfection.`                
                }   
                    codeColor="text-blue-200"
                ></CodeBlocks>
            </div>

            {/* Section 2*/}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center text-white gap-40 mt-20">
                <InstructorSection />
            </div>

            {/* Footer */}
            <div className="flex bg-richblack-800 justify-center items-center">
                <FooterSection />
            </div>
        </div>
    );
};

export default Home;
