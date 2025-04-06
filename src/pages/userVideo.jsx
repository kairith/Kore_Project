import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoListUser = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    axios
      .get("http://localhost:8000/videos/")
      .then((response) => {
        console.log("Fetched videos (user):", response.data);
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

  const categories = [
    "ALL",
    "PREGNANCY",
    "LIFEBEFOREBIRTH",
    "FOOD",
    "BODY",
    "FEELING",
  ];

  const groupedVideos = categories.reduce((acc, category) => {
    if (category === "ALL") {
      acc[category] = videos;
    } else {
      acc[category] = videos.filter((video) => video.category === category);
    }
    return acc;
  }, {});
  console.log("Grouped videos (user):", groupedVideos);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Uploaded Videos</h2>
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
                            <source src={`http://localhost:8000${video.file_url}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
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
    </div>
  );
};

export default VideoListUser;