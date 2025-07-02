import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Videos = ({ token }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    videoId: "",
    title: "",
    description: "",
  });

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/videos/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setVideos(data.videos);
      } else {
        toast.error(data.message || "Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new video
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to add videos");
      return;
    }

    try {
      console.log("Sending request to:", `${backendUrl}/api/videos/add`);
      console.log("With token:", token);
      console.log("With data:", formData);

      const response = await fetch(`${backendUrl}/api/videos/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData),
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Server returned invalid JSON response");
      }

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      if (data.success) {
        toast.success("Video added successfully");
        setFormData({ videoId: "", title: "", description: "" });
        fetchVideos();
      } else {
        toast.error(data.message || "Failed to add video");
      }
    } catch (error) {
      console.error("Error adding video:", error);
      toast.error(error.message || "Failed to add video");
    }
  };

  // Delete video
  const handleDelete = async (id) => {
    if (!token) {
      toast.error("Please login to delete videos");
      return;
    }

    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        const response = await fetch(`${backendUrl}/api/videos/delete/${id}`, {
          method: "DELETE",
          headers: {
            token: token,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        if (data.success) {
          toast.success("Video deleted successfully");
          fetchVideos();
        } else {
          toast.error(data.message || "Failed to delete video");
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        toast.error(error.message || "Failed to delete video");
      }
    }
  };

  // Toggle video status
  const handleToggle = async (id) => {
    if (!token) {
      toast.error("Please login to update video status");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/videos/toggle/${id}`, {
        method: "PUT",
        headers: {
          token: token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        toast.success("Video status updated");
        fetchVideos();
      } else {
        toast.error(data.message || "Failed to update video status");
      }
    } catch (error) {
      console.error("Error toggling video:", error);
      toast.error(error.message || "Failed to update video status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Videos</h2>

      {/* Add Video Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 bg-white rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Video</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-2">YouTube Video ID</label>
            <input
              type="text"
              name="videoId"
              value={formData.videoId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter YouTube video ID"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Example: For https://www.youtube.com/watch?v=pt8VpBKEBy4, enter
              pt8VpBKEBy4
            </p>
          </div>
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter video title"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter video description"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Video
          </button>
        </div>
      </form>

      {/* Videos List */}
      <div className="bg-white rounded shadow">
        <h3 className="text-xl font-semibold p-4 border-b">Videos List</h3>
        <div className="divide-y">
          {videos.map((video) => (
            <div
              key={video._id}
              className="p-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <h4 className="font-semibold">{video.title}</h4>
                <p className="text-gray-600 text-sm">{video.description}</p>
                <p className="text-gray-500 text-xs">ID: {video.videoId}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(video._id)}
                  className={`px-3 py-1 rounded ${
                    video.isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {video.isActive ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
