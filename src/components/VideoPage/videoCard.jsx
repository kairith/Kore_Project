import React, { useEffect } from "react";

const VideoCard = ({ videoId, title, description, file_url, activeVideo, setActiveVideo, currentFilter, isModal = false, isSmallModal = false }) => {
  const isActive =
    activeVideo?.videoId === videoId &&
    activeVideo?.filter === currentFilter &&
    activeVideo?.isModal === isModal;

  useEffect(() => {
    const clickedVideos = JSON.parse(localStorage.getItem("clickedVideos")) || {};
    if (clickedVideos[videoId] && !activeVideo?.videoId) {
      setActiveVideo({ videoId, filter: currentFilter, isModal });
    }
  }, [videoId, activeVideo, setActiveVideo, currentFilter, isModal]);

  const handleClick = () => {
    if (activeVideo?.videoId && activeVideo.videoId !== videoId) {
      setActiveVideo(null);
    }
    setTimeout(() => {
      setActiveVideo({ videoId, filter: currentFilter, isModal });
      const clickedVideos = JSON.parse(localStorage.getItem("clickedVideos")) || {};
      clickedVideos[videoId] = true;
      localStorage.setItem("clickedVideos", JSON.stringify(clickedVideos));
    }, 100);
  };

  return (
    <div className={`w-[200px] h-[240px] md:w-[342px] md:h-[360px] flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
      isSmallModal ? "w-[150px] h-[180px]" : ""
    }`}>
      <div className={`relative w-full ${
        isSmallModal ? "h-[90px]" : "h-[120px] md:h-[193px]"
      } overflow-hidden`}>
        {!isActive ? (
          <video
            className="w-full h-full object-cover cursor-pointer"
            muted
            loop
            autoPlay
            playsInline
            onClick={handleClick}
          >
            <source src={file_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <video
            className="absolute inset-0 w-full h-full rounded-md"
            controls
            autoPlay
          >
            <source src={file_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className={`p-2 md:p-4 flex flex-col flex-grow ${
        isSmallModal ? "p-1" : ""
      }`}>
        <h3 className={`font-bold text-sm md:text-base mb-2 ${
          isSmallModal ? "text-xs mb-1" : ""
        }`}>{title}</h3>
        <p className={`font-regular text-sm md:text-base text-gray-700 flex-grow ${
          isSmallModal ? "text-xs" : ""
        }`}>{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;