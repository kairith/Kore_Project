import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoListAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    axios
      .get("http://localhost:8000/videos/")
      .then((response) => {
        console.log("Fetched videos (admin):", response.data);
        if (Array.isArray(response.data)) {
          setVideos(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setVideos([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching videos:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Status:", error.response.status);
        }
        setVideos([]);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/videos/${id}/`)
      .then(() => {
        fetchVideos();
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setNewTitle(video.title);
    setNewDescription(video.description);
    setNewCategory(video.category);
    setNewFile(null);
  };

  const handleUpdate = () => {
    if (!selectedVideo) return;

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("category", newCategory);
    if (newFile) {
      formData.append("file", newFile);
    }

    axios
      .put(`http://localhost:8000/videos/${selectedVideo.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setSelectedVideo(null);
        fetchVideos();
      })
      .catch((error) => {
        console.error("Error updating video:", error);
      });
  };

  const categories = [
    "ALL",
    "PREGNANCY",
    "BEFOREGIVEBIRTH",
    "FOOD",
    "BODY",
    "FEELING",
    "Uncategorized",
  ];

  const groupedVideos = categories.reduce((acc, category) => {
    if (category === "ALL") {
      acc[category] = videos;
    } else {
      acc[category] = videos.filter((video) => video.category === category);
    }
    return acc;
  }, {});
  console.log("Grouped videos (admin):", groupedVideos);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin: Uploaded Videos</h2>
      <h3 className="text-lg font-semibold text-center mb-4">
        Total Videos: {videos.length}
      </h3>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos uploaded yet.</p>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              {groupedVideos[category].length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedVideos[category].map((video) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
                      >
                        <h4 className="text-xl font-semibold text-blue-600 mb-2">{video.title}</h4>
                        <p className="text-gray-600 mb-2 text-sm">{video.description}</p>
                        <p className="text-gray-500 mb-4 text-sm">Category: {video.category}</p>
                        <div className="flex justify-center mb-4">
                          <video className="w-full h-auto rounded-md" controls>
                            <source src={video.file_url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="flex justify-between mt-2">
                          <button
                            onClick={() => handleEditClick(video)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete?")) {
                                handleDelete(video.id);
                              }
                            }}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
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
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="video/mp4"
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
                onClick={() => setSelectedVideo(null)}
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

export default VideoListAdmin;