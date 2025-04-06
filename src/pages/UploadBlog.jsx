import { useState } from "react";
import axios from "axios";

const UploadBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("createdAt", newDate);

    try {
      const response = await axios.post("http://localhost:8000/uploads/blogs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setTitle("");
      setDescription("");
      setImage(null);
      setNewDate("");
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message); // Detailed logging
      setMessage(`Error uploading blog: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Upload Blog</h2>

      {message && <p className="text-red-500 text-center">{message}</p>}

      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload Blog
        </button>
      </form>
    </div>
  );
};

export default UploadBlog;