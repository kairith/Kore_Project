import React, { useState, useEffect, useRef } from "react";
import SlideBlog from "../../assets/Blogpage/SlideBlog.jpg";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../variants";

const SlideSearch = ({ setBlogs }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]); // Store all blogs for reset
  const searchContainerRef = useRef(null); // Ref to position dropdown

  useEffect(() => {
    // Fetch all blogs initially
    axios
      .get("http://localhost:8000/blogs/")
      .then((res) => {
        setAllBlogs(res.data);
        setBlogs(res.data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [setBlogs]);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setBlogs(allBlogs); // Reset to all blogs if search is empty
      setResults([]);
      return;
    }

    try {
      const url = `http://localhost:8000/blogs/?search=${encodeURIComponent(keyword)}`;
      const res = await axios.get(url);
      const filteredResults = res.data.filter((blog) =>
        blog.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setResults(filteredResults);
      setBlogs(filteredResults.length > 0 ? filteredResults : allBlogs); // Update blogs based on results
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setResults([]);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[700px]">
      <img
        src={SlideBlog}
        alt="Pregnancy Search"
        className="w-full h-full object-cover"
      />
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 mt-4"
      >
        <h1 className="font-regular text-2xl sm:text-3xl lg:text-5xl mb-2">ចំណេះដឹង</h1>
        <p className="font-regular text-lg sm:text-xl lg:text-2xl mb-4">
          ដែលម៉ាក់ៗគ្រប់រូបគួរយល់ដឹង
        </p>
        <div
          ref={searchContainerRef}
          className="relative flex flex-row w-full max-w-md"
        >
          <CiSearch
            onClick={handleSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer"
          />
          <input
            type="text"
            placeholder="ស្វែងរកប្រធានបទ"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (e.target.value.trim() === "") {
                setBlogs(allBlogs); // Reset blogs if input is cleared
                setResults([]); // Clear dropdown
              } else {
                handleSearch(); 
              }
            }}
            onKeyDown={handleEnterKey}
            className="font-regular w-full pl-12 py-2 sm:py-3 border shadow-2xl bg-zinc-200 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-sky-400"
          />

          {/* Animated Dropdown */}
          <AnimatePresence>
            {results.length > 0 && keyword.trim() && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full left-0 mt-2 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg z-10"
              >
                {results.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setKeyword(blog.title);
                      setBlogs([blog]);
                      setResults([]); // Close dropdown after selection
                    }}
                  >
                    <p className="font-regular text-sm sm:text-base">{blog.title}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SlideSearch;