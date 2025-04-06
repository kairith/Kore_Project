import React, { useRef, useState, useEffect } from "react";
import VideoCard from "./videoCard";

const VideoGrid = ({ filter, videos, activeVideo, setActiveVideo }) => {
  const containerRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const filteredVideos = filter
    ? videos.filter((video) => video.tags.includes(filter))
    : videos;

  const currentFilter = filter || "all";

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setActiveVideo(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closePopup();
    };
    if (isPopupOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isPopupOpen]);

  return (
    <div>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex overflow-x-auto gap-2 md:gap-4 pb-4 scrollbar-hide cursor-grab active:cursor-grabbing md:mx-10"
        role="region"
        aria-label={`Video grid for ${currentFilter} category`}
      >
        {filteredVideos.map((video) => (
          <div key={video.id} className="flex-shrink-0 w-[200px] md:w-[342px]">
            <VideoCard
              videoId={video.id}
              title={video.title}
              description={video.description}
              file_url={video.file_url}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              currentFilter={currentFilter}
              isModal={false}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-2 md:mt-4 mr-4 md:mr-19">
        <button
          onClick={openPopup}
          className="bg-blue-500 font-regular text-white px-3 md:px-4 py-1 md:py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base"
          aria-label="Show more videos"
        >
          ច្រើនទៀត
        </button>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
          onClick={closePopup}
          role="dialog"
          aria-modal="true"
          aria-label={`More videos for ${currentFilter} category`}
        >
          <div
            className="bg-white p-2 md:p-6 rounded-lg w-11/12 md:w-9/12 max-w-[95vw] md:max-w-7xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              type="button"
              className="absolute top-2 md:top-4 right-4 bg-gray-500 rounded-md p-1 md:p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Close popup"
            >
              <span className="sr-only">Close popup</span>
              <svg
                className="h-4 w-4 md:h-6 md:w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-7">
              {filteredVideos.map((video) => (
                <div key={video.id} className="flex-shrink-0">
                  <VideoCard
                    videoId={video.id}
                    title={video.title}
                    description={video.description}
                    file_url={video.file_url}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                    currentFilter={currentFilter}
                    isModal={true}
                    isSmallModal={
                      !window.matchMedia("(min-width: 768px)").matches
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {filteredVideos.length === 0 && (
        <p className="text-center text-gray-500 text-sm md:text-base">
          No videos found for this category.
        </p>
      )}
    </div>
  );
};

export default VideoGrid;