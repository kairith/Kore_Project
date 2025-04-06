import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import VideoGrid from "./videoGrid";
import HeroSection from "./heroSection";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const seeAllVideosRef = useRef(null);
  const understandingPregnancyRef = useRef(null);
  const prenatalHealthRef = useRef(null);
  const nutritionDietRef = useRef(null);
  const physicalWellbeingRef = useRef(null);
  const emotionalSupportRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/videos/");
      console.log("Fetched videos:", response.data);
      if (Array.isArray(response.data)) {
        const mappedVideos = response.data.map((video) => {
          let tag;
          switch (video.category.toUpperCase()) {
            case "PREGNANCY":
              tag = "understanding-pregnancy";
              break;
            case "BEFOREGIVEBIRTH":
              tag = "prenatal-health";
              break;
            case "FOOD":
              tag = "nutrition-diet";
              break;
            case "BODY":
              tag = "physical-wellbeing";
              break;
            case "FEELING":
              tag = "emotional-support";
              break;
            default:
              tag = "uncategorized";
          }
          return {
            id: video.id,
            title: video.title,
            description: video.description,
            file_url: video.file_url,
            tags: [tag],
          };
        });
        setVideos(mappedVideos);
      } else {
        console.error("Unexpected data format:", response.data);
        setVideos([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  const scrollToFilter = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <HeroSection />
      <div className="p-2 md:p-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-7 mt-10 md:mt-20 mx-4 md:mx-10 text-pink-500">
          ប្រភេទវីដេអូ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mx-4 md:mx-10">
          <div onClick={() => scrollToFilter(seeAllVideosRef)} className="cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/videoPage/see-all.jpg"
                alt="See All Videos"
                className="w-full h-32 md:h-48 object-cover transform transition-transform group-hover:scale-105 brightness-70"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-base md:text-xl font-bold text-center">វីដេអូទាំងអស់</h3>
              </div>
            </div>
          </div>
          <div onClick={() => scrollToFilter(understandingPregnancyRef)} className="cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/videoPage/understanding-pregnancy.jpg"
                alt="Understanding Pregnancy"
                className="w-full h-32 md:h-48 object-cover transform transition-transform group-hover:scale-105 brightness-70"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-base md:text-xl font-bold text-center">ការយល់ដឹងអំពីការមានផ្ទៃពោះ</h3>
              </div>
            </div>
          </div>
          <div onClick={() => scrollToFilter(prenatalHealthRef)} className="cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/videoPage/prenatal-health.jpg"
                alt="Prenatal Health"
                className="w-full h-32 md:h-48 object-cover transform transition-transform group-hover:scale-105 brightness-70"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-base md:text-xl font-bold text-center">សុខភាពមុនពេលសម្រាល</h3>
              </div>
            </div>
          </div>
          <div onClick={() => scrollToFilter(nutritionDietRef)} className="cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/videoPage/nutrition-diet.jpg"
                alt="Nutrition and Diet"
                className="w-full h-32 md:h-48 object-cover transform transition-transform group-hover:scale-105 brightness-70"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-base md:text-xl font-bold text-center">អាហារូបត្ថម្ភនិងរបបអាហារ</h3>
              </div>
            </div>
          </div>
          <div onClick={() => scrollToFilter(physicalWellbeingRef)} className="cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/videoPage/physical-wellbeing.jpg"
                alt="Physical Well-being"
                className="w-full h-32 md:h-48 object-cover transform transition-transform group-hover:scale-105 brightness-70"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-base md:text-xl font-bold text-center">សុខុមាលភាពរាងកាយ</h3>
              </div>
            </div>
          </div>
          <div onClick={() => scrollToFilter(emotionalSupportRef)} className="cursor-pointer">
            <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/videoPage/emotional-support.jpg"
                alt="Emotional Support"
                className="w-full h-32 md:h-48 object-cover transform transition-transform group-hover:scale-105 brightness-70"
              />
              <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-base md:text-xl font-bold text-center">ការគ្រប់គ្រងអារម្មណ៍</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 md:p-4">
        <div ref={seeAllVideosRef}>
          <h3 className="font-bold text-xl md:text-2xl text-pink-500 mb-4 md:mb-6 mt-10 md:mt-20 md:mx-10">
            វីដេអូទាំងអស់
          </h3>
          <VideoGrid videos={videos} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
        </div>
        <div ref={understandingPregnancyRef}>
          <h3 className="font-bold text-xl md:text-2xl text-pink-500 mb-4 md:mb-6 mt-4 md:mt-7 md:mx-10">
            ការយល់ដឹងអំពីការមានផ្ទៃពោះ
          </h3>
          <VideoGrid
            filter="understanding-pregnancy"
            videos={videos}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />
        </div>
        <div ref={prenatalHealthRef}>
          <h3 className="font-bold text-xl md:text-2xl text-pink-500 mb-4 md:mb-6 mt-4 md:mt-7 md:mx-10">
            សុខភាពមុនពេលសម្រាល
          </h3>
          <VideoGrid
            filter="prenatal-health"
            videos={videos}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />
        </div>
        <div ref={nutritionDietRef}>
          <h3 className="font-bold text-xl md:text-2xl text-pink-500 mb-4 md:mb-6 mt-4 md:mt-7 md:mx-10">
            អាហារូបត្ថម្ភនិងរបបអាហារ
          </h3>
          <VideoGrid
            filter="nutrition-diet"
            videos={videos}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />
        </div>
        <div ref={physicalWellbeingRef}>
          <h3 className="font-bold text-xl md:text-2xl text-pink-500 mb-4 md:mb-6 mt-4 md:mt-7 md:mx-10">
            សុខុមាលភាពរាងកាយ
          </h3>
          <VideoGrid
            filter="physical-wellbeing"
            videos={videos}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />
        </div>
        <div ref={emotionalSupportRef}>
          <h3 className="font-bold text-xl md:text-2xl text-pink-500 mb-4 md:mb-6 mt-4 md:mt-7 md:mx-10">
            ការគ្រប់គ្រងអារម្មណ៍
          </h3>
          <VideoGrid
            filter="emotional-support"
            videos={videos}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;