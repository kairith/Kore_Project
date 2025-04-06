import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogPost = ({ blogs = [] }) => {
    return (
        <div className="relative bg-gray-100 mt-20 sm:mt-0">
            {/* Title */}
            <div className="text-center pt-20 sm:pt-0 mb-12 sm:mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold">អត្ថបទ</h1>
            </div>

            {/* Blog Cards */}
            <div className="container mx-auto px-4 py-8 flex flex-wrap justify-center gap-8">
                {blogs?.length === 0 ? (
                    <p className="text-center text-gray-500">រកមិនឃើញអត្ថបទដែលពាក់ព័ន្ធទេ។</p>
                ) : (
                    blogs.map((item) => (
                        <Link
                            to={`/អានអត្តបទ/${item.id}`}
                            key={item.id}
                            className="bg-white w-80 mb-6 rounded-sm shadow-sm overflow-hidden flex flex-col transition duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <img src={item.image_url} alt={item.title} className="w-full h-auto" />
                            <div className="p-4 flex-1">
                                <h2 className="text-sm sm:text-[16px] lg:text-lg font-bold mb-2">{item.title}</h2>
                                <p className="text-[12px] mb-4 font-regular">
                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "ថ្ងៃនេះ"}
                                </p>
                                <p className="line-clamp-3 text-sm sm:text-[16px] font-regular text-gray-500">{item.description}</p>
                            </div>

                            <div className="px-4 pb-4 flex justify-between items-center">
                                <span className="text-black text-sm font-regular inline-flex transition duration-300 hover:text-rose-300">
                                    អានបន្ថែម →
                                </span>
                                <div className="flex space-x-3 text-gray-500">
                                    <a
                                        href="#"
                                        className="bg-blue-500 p-1 rounded-lg text-white flex items-center justify-center transition transform duration-200 hover:scale-105"
                                    >
                                        <FaFacebookF />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-1 rounded-lg bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white flex items-center justify-center transition transform duration-200 hover:scale-105"
                                    >
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogPost;
