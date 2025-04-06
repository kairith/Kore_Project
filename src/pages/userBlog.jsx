import { useEffect, useState } from "react";
import axios from "axios";

const DisplayBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/blogs/");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/blogs/${id}`);
      fetchBlogs(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setNewTitle(blog.title);
    setNewDescription(blog.description);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);

    if (newFile) {
      formData.append("image", newFile);
    }

    try {
      await axios.put(`http://localhost:8000/blogs/${selectedBlog.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchBlogs(); // Refresh list after update
      setSelectedBlog(null); // Close the edit modal
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Blog Posts</h2>
      <h3 className="text-lg font-semibold text-center mb-4">
       Total blog: {blogs.length}
      </h3>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
              {/* Display image with loading state */}
              {blog.image_url ? (
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center text-gray-600">
                  No Image Available
                </div>
              )}
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{blog.description}</p>
              <div className="flex justify-between mt-auto">
              
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <textarea
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewFile(e.target.files[0])}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedBlog(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayBlogs;
