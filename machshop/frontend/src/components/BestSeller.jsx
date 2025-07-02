import React, { useState, useEffect } from "react";
import Title from "./Title";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BestSeller = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/videos/all`);
        const data = await response.json();
        if (data.success) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"OUR"} text2={"VIDEOS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-black">
          "Watch our products in action - demonstrations and reviews from our
          satisfied customers!" 🚜🌿
        </p>
      </div>

      {/* Horizontally scrollable video container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max px-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className="w-[400px] sm:w-[500px] flex-shrink-0"
            >
              <iframe
                className="w-full aspect-video rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="mt-2">
                <h3 className="font-semibold text-lg text-black">{video.title}</h3>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
