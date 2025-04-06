import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaShareAlt } from "react-icons/fa";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/blogs/${id}/`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading data...</p>;
  if (!blog) return <h1 className="text-center mt-20 text-red-500">Blog Not Found</h1>;

  return (
    <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        {/* Blog Media */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-md">
          <img src={blog.image_url} alt={blog.title} className="w-full h-auto rounded-md" />
        </div>

        {/* Blog Content */}
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-4 mt-2">
            Published on {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "N/A"}
          </p>

          {/* Social Share Icons */}
          <div className="flex items-center space-x-4 text-gray-500 mb-4">
            <span className="text-lg font-bold">Share:</span>
            <a href="#" className="p-2 rounded-full bg-blue-500 text-white hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-blue-400 text-white hover:scale-110 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-700 text-white hover:scale-110 transition">
              <FaShareAlt />
            </a>
          </div>

          {/* Blog Description */}
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            {blog.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
