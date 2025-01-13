import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

// Footer Link creation
const Services = ["Event Planning", "Corporate Events", "Weddings", "Private Celebrations"];
const AboutUs = ["Our Story", "Team", "Careers"];
const Resources = ["Blog", "FAQs", "Event Tips", "Gallery"];
const Support = ["Contact Us", "Help Center"];
const Policies = ["Privacy Policy", "Terms of Service"];

const FooterSection = () => {
    return (
        <div className="flex flex-col w-11/12 mx-auto items-center justify-center h-[100%]">
            <div className="flex flex-row items-start justify-center w-[100%] py-[50px]">
                {/* First Half */}
                <div className="w-[100%] flex flex-col lg:flex-row justify-end items-start">
                    <div className="flex flex-col lg:flex-row gap-3 w-[60%]">
                        {/* Services and About Us */}
                        <div className="flex flex-col gap-3 w-[50%] text-richblack-400 leading-[22px]">
                            <div className=" md:h-[32px] md:w-[160px] h-[26px] w-[130px] text-3xl font-[cursive] text-richblack-5 font-bold">
                                <span className=" text-yellow-50">Event</span>Craft
                            </div>
                            <h2 className=" font-semibold text-richblack-100">
                                Services
                            </h2>
                            <div className="flex flex-col text-[14px] gap-2">
                                {Services.map((ele, index) => {
                                    return (
                                        <div
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            key={index}
                                        >
                                            <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                                                {ele}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex flex-row gap-3 items-end">
                                <a
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram className=" cursor-pointer hover:text-pink-100 transition-all duration-200" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTwitter className="cursor-pointer hover:text-blue-100 transition-all duration-200" />
                                </a>
                                <a
                                    href="mailto:info@eventcraft.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <BiLogoGmail className="cursor-pointer text-lg hover:text-pink-400 transition-all duration-200" />
                                </a>
                                <a
                                    href="https://www.linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedinIn className="cursor-pointer hover:text-blue-300 transition-all duration-200" />
                                </a>
                            </div>
                        </div>
                        {/* About Us and Resources */}
                        <div className="text-richblack-400 flex flex-col gap-3 w-[50%] leading-[22px]">
                            <div className=" flex flex-col gap-3">
                                <h2 className=" font-semibold text-richblack-100">
                                    About Us
                                </h2>
                                <div className="flex flex-col text-[14px] gap-2">
                                    {AboutUs.map((ele, index) => {
                                        return (
                                            <div
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                key={index}
                                            >
                                                <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                                                    {ele}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className=" flex flex-col gap-3">
                                <h2 className=" font-semibold text-richblack-100">
                                    Resources
                                </h2>
                                <div className="flex flex-col text-[14px] gap-2">
                                    {Resources.map((ele, index) => {
                                        return (
                                            <div
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                key={index}
                                            >
                                                <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                                                    {ele}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Support and Policies */}
                    <div className="w-[28%] leading-[22px]">
                        <div className="text-richblack-400 flex flex-col gap-3">
                            <div className=" flex flex-col gap-3">
                                <h2 className=" font-semibold text-richblack-100">
                                    Support
                                </h2>
                                <div className="flex flex-col text-[14px] gap-2">
                                    {Support.map((ele, index) => {
                                        return (
                                            <div
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                key={index}
                                            >
                                                <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                                                    {ele}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className=" flex flex-col gap-3">
                                <h2 className=" font-semibold text-richblack-100">
                                    Policies
                                </h2>
                                <div className="flex flex-col text-[14px] gap-2">
                                    {Policies.map((ele, index) => {
                                        return (
                                            <div
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                key={index}
                                            >
                                                <Link to={`/${ele.split(" ").join("-").toLowerCase()}`}>
                                                    {ele}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Last line */}
            <div className="flex lg:flex-row flex-col items-center w-[90%] lg:justify-between justify-center lg:h-[120px] h-[60px] text-richblack-400 text-sm lg:gap-0 gap-5 border-t border-richblack-700 lg:p-4 p-16">
                <div className="flex flex-row gap-3">
                    {Policies.map((ele, index) => {
                        return (
                            <div
                                className={` pr-3 ${
                                    index === Policies.length - 1
                                        ? ""
                                        : "border-r border-richblack-700"
                                }`}
                                key={index}
                            >
                                {ele}
                            </div>
                        );
                    })}
                </div>
                <div>
                    <p>© 2025 EventCraft. Designed with Anubhav.</p>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;
