
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState({});
  const [identity, setIdentity] = useState("Anonymous");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedComments, setExpandedComments] = useState(new Set()); // Tracks post IDs with all comments visible
  const [likingPost, setLikingPost] = useState(null); // Add this line
  const [editProfile, setEditProfile] = useState({
    phone: "",
    gender: "",
    profileImage: null,
  });
  const [editError, setEditError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState("");
  const [editPostImages, setEditPostImages] = useState([]);
  const [editPostExistingImages, setEditPostExistingImages] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handleLike = async (postId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/likes/`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       },
  //       body: new URLSearchParams({ post_id: postId }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
  //     }

  //     const data = await response.json();
  //     setLikedPosts((prev) => {
  //       const updatedLikedPosts = new Set(prev);
  //       if (updatedLikedPosts.has(postId)) {
  //         updatedLikedPosts.delete(postId);
  //       } else {
  //         updatedLikedPosts.add(postId);
  //       }
  //       return updatedLikedPosts;
  //     });
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setEditError(null);

    const formData = new FormData();
    if (editProfile.phone) formData.append("phone", editProfile.phone);
    if (editProfile.gender) formData.append("gender", editProfile.gender);
    if (editProfile.profileImage)
      formData.append("profileImage", editProfile.profileImage);

    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.put(
        "http://localhost:8000/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserProfile(response.data.user);
      setIsEditing(false);
      setEditProfile({
        phone: response.data.user.phone || "",
        gender: response.data.user.gender || "",
        profileImage: null,
      });
    } catch (error) {
      console.error("❌ Edit Profile Error:", error);
      setEditError(error.response?.data?.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch("http://localhost:8000/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch profile");
    const profileData = await response.json();
    console.log("Profile data fetched:", profileData);
    setUserProfile(profileData);
    setIdentity(`${profileData.firstName} ${profileData.lastName}`);
    setEditProfile({
      phone: profileData.phone || "",
      gender: profileData.gender || "",
      profileImage: null,
    });
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error.message);
    setUserProfile({
      firstName: "Guest",
      lastName: "",
      email: "N/A",
      _id: "guest",
    });
  } finally {
    setProfileLoading(false);
  }
};

    const fetchPosts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/posts/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const enrichedPosts = response.data.map((post) => ({
          ...post,
          author:
            post.identity === "Anonymous"
              ? {
                  firstName: "Anonymous",
                  lastName: "",
                  profileImage: "../../../public/videoPage/default-avatar.png",
                }
              : post.author || {
                  firstName: userProfile?.firstName || "",
                  lastName: userProfile?.lastName || "",
                  profileImage: userProfile?.profileImage || "/default-avatar.png",
                },
          likes: post.likes || 0,
        }));
        setPosts(enrichedPosts);
        setLikedPosts(
          new Set(response.data.filter((post) => post.liked_by_user).map((post) => post.id))
        );
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [navigate]);

  const handleNewPost = async () => {
    if (!newPost.trim()) return;

    const formData = new FormData();
    formData.append("user_id", userProfile?._id);
    formData.append("content", newPost);
    const postIdentity =
      identity === `${userProfile?.firstName} ${userProfile?.lastName}`
        ? `${userProfile.firstName} ${userProfile.lastName}`
        : "Anonymous";
    formData.append("identity", postIdentity);

    if (images.length > 0) {
      images.forEach((img) => formData.append("images", img));
    }

    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/posts/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("New post response:", response.data); // Debug
      const newPostData = {
        ...response.data,
        id: response.data.id || response.data.post_id, // Ensure ID is set
        user_id: userProfile?._id, // Explicitly set user_id
        author: {
          firstName: userProfile?.firstName,
          lastName: userProfile?.lastName,
        },
        image_urls: response.data.image_urls || [], // Ensure image_urls is included
        createdAt: response.data.createdAt || new Date().toISOString(), // Add timestamp if missing
        status: response.data.status || "pending", // Default status
        comments: response.data.comments || [], // Default empty comments
        likes: response.data.likes || 0, // Default likes
      };
      setNewPost("");
      setIdentity(postIdentity);
      setImages([]);
      setPosts((prevPosts) => [newPostData, ...prevPosts]);
      window.location.reload(); // Trigger page refresh after successful post
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
    }
  };

  const handleLike = async (postId) => {
    if (likingPost === postId) return;
    setLikingPost(postId);

    const isLiked = likedPosts.has(postId);
    const method = isLiked ? "DELETE" : "POST";
    const url = isLiked
      ? `http://localhost:8000/likes/${postId}/`
      : `http://localhost:8000/likes/`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          ...(method === "POST"
            ? { "Content-Type": "application/x-www-form-urlencoded" }
            : {}),
        },
        ...(method === "POST"
          ? { body: new URLSearchParams({ post_id: postId }) }
          : {}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, detail: ${errorData.detail}`
        );
      }

      const data = await response.json(); // { message, post_id, likes, liked }
      setLikedPosts((prev) => {
        const updatedLikedPosts = new Set(prev);
        if (data.liked) {
          updatedLikedPosts.add(postId); // Like
        } else {
          updatedLikedPosts.delete(postId); // Unlike
        }
        return updatedLikedPosts;
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: data.likes } : post
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      // Optional: toast.error("Failed to toggle like");
    } finally {
      setLikingPost(null);
    }
  };

  const handleNewComment = async (postId) => {
    const comment = newComment[postId];
    if (!comment) return;
  
    const token = sessionStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("post_id", postId);
      formData.append("content", comment);
      // Send the selected identity (Anonymous or user's name)
      formData.append("identity", identity);
  
      const response = await fetch(`http://localhost:8000/comments/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
      }
  
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...(post.comments || []), data] }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditPost = (post) => {
    console.log("Editing post:", post);
    setEditingPostId(post.id);
    setEditPostContent(post.content);
    setEditPostImages([]); // New images start empty
    setEditPostExistingImages(post.image_urls || []); // Preserve all existing images
  };

  const handleSaveEdit = async (postId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/");
      return;
    }

    const formData = new FormData();
    formData.append("content", editPostContent);
    // Append new images (if any)
    editPostImages.forEach((img) => formData.append("images", img));
    // Always send existing images as a JSON string, even if empty
    formData.append("existingImages", JSON.stringify(editPostExistingImages));
    formData.append("status", "pending");

    try {
      const response = await axios.put(
        `http://localhost:8000/posts/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Edit response:", response.data); // Debug
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...response.data } : post
        )
      );
      setEditingPostId(null);
      setEditPostContent("");
      setEditPostImages([]);
      setEditPostExistingImages([]);
    } catch (error) {
      console.error(
        "Error editing post:",
        error.response?.data || error.message
      );
      alert(
        `Failed to save edits: ${
          error.response?.data?.detail || "Unknown error"
        }`
      );
    }
  };

  const handleDeleteImage = (imageUrl) => {
    setEditPostExistingImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const handleDeletePost = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Post deleted:", postId); // Debug
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
      alert(
        `Failed to delete post: ${
          error.response?.data?.detail || "Unknown error"
        }`
      );
    }
  };

  const handlePostClick = (post) => {
    if (post.image_urls && post.image_urls.length > 0) {
      setSelectedPost(post);
      setCurrentImageIndex(0);
    }
  };

  const handleNextImage = () => {
    if (
      selectedPost &&
      currentImageIndex < selectedPost.image_urls.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedPost && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleClose = () => {
    setSelectedPost(null);
  };

  const handleKeyDown = (event) => {
    if (!selectedPost) return;
    switch (event.key) {
      case "ArrowLeft":
        handlePrevImage();
        break;
      case "ArrowRight":
        handleNextImage();
        break;
      case "Escape":
        handleClose();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedPost) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPost, currentImageIndex]);

  const renderImageGrid = (media, post) => {
    const imageCount = media.length;

    if (imageCount === 1) {
      return (
        <div className="grid grid-cols-1">
          <img
            src={media[0]}
            alt="Post Media"
            className="max-w-md w-full h-auto max-h-[600px] object-cover rounded-lg cursor-pointer"
            onClick={() => handlePostClick(post)}
            onError={(e) => (e.target.src = "/default-image.png")}
          />
        </div>
      );
    }

    if (imageCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {media.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Post Media"
              className="w-full h-64 object-cover rounded-lg cursor-pointer"
              onClick={() => handlePostClick(post)}
              onError={(e) => (e.target.src = "/default-image.png")}
            />
          ))}
        </div>
      );
    }

    if (imageCount === 3) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <img
            src={media[0]}
            alt="Post Media"
            className="w-full h-96 object-cover rounded-lg row-span-2 cursor-pointer"
            onClick={() => handlePostClick(post)}
            onError={(e) => (e.target.src = "/default-image.png")}
          />
          <img
            src={media[1]}
            alt="Post Media"
            className="w-full h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => handlePostClick(post)}
            onError={(e) => (e.target.src = "/default-image.png")}
          />
          <img
            src={media[2]}
            alt="Post Media"
            className="w-full h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => handlePostClick(post)}
            onError={(e) => (e.target.src = "/default-image.png")}
          />
        </div>
      );
    }

    if (imageCount >= 4) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <img
            src={media[0]}
            alt="Post Media"
            className="w-full h-96 object-cover rounded-lg row-span-2 cursor-pointer"
            onClick={() => handlePostClick(post)}
            onError={(e) => (e.target.src = "/default-image.png")}
          />
          <img
            src={media[1]}
            alt="Post Media"
            className="w-full h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => handlePostClick(post)}
            onError={(e) => (e.target.src = "/default-image.png")}
          />
          <img
            src={media[2]}
            alt="Post Media"
            className="w-full h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => handlePostClick(post)}
            onError={(e) => (e.target.src = "/default-image.png")}
          />
          {imageCount > 4 ? (
            <div className="relative">
              <img
                src={media[3]}
                alt="Post Media"
                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                onClick={() => handlePostClick(post)}
                onError={(e) => (e.target.src = "/default-image.png")}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-lg">
                +{imageCount - 4}
              </div>
            </div>
          ) : (
            <img
              src={media[3]}
              alt="Post Media"
              className="w-full h-48 object-cover rounded-lg cursor-pointer"
              onClick={() => handlePostClick(post)}
              onError={(e) => (e.target.src = "/default-image.png")}
            />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="flex p-6 bg-gray-100 rounded-lg shadow-md h-screen mt-14">
        <div className="w-2/3 pr-4 overflow-y-auto h-full">
          <h2 className="font-bold text-2xl mb-6 text-center mt-4 text-blue-500">
            ចែករំលែកជាមួយគ្នានៅទីនេះ
          </h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            <div>
              {[...posts]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post) => {
                  const isExpanded = expandedComments.has(post.id);
                  const visibleComments = isExpanded
                    ? post.comments || []
                    : (post.comments || []).slice(0, 3); // Show only 3 comments by default
                  const totalComments = (post.comments || []).length;

                  return (
                    <div
                      key={post.id || post.post_id}
                      className="bg-white rounded-lg shadow-md p-4 mb-4"
                    >
                      {post.status === "pending" && (
                        <p className="text-yellow-500 mt-[-15px]">
                          Pending Approval...
                        </p>
                      )}
                      <div className="flex items-center mb-2">
                        <img
                          src={
                            post.author?.profileImage || "/default-avatar.png"
                          }
                          alt="Author"
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                          onError={(e) =>
                            (e.target.src = "/default-avatar.png")
                          }
                        />
                        <div>
                          <p className="text-gray-800 font-bold font-semibold text-sm">
                            {post.identity === "Anonymous"
                              ? "Anonymous"
                              : `${post.author?.firstName} ${post.author?.lastName}`}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(post.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-2">{post.content}</p>
                      {post.image_urls && Array.isArray(post.image_urls) && (
                        <div className="mt-2">
                          {renderImageGrid(post.image_urls, post)}
                        </div>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post.id);
                          }}
                          disabled={likingPost === post.id}
                          className={`flex items-center space-x-1 transition duration-200 ${
                            likedPosts.has(post.id)
                              ? "text-red-500 hover:text-red-600"
                              : "text-gray-600 hover:text-gray-800"
                          } ${
                            likingPost === post.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill={
                              likedPosts.has(post.id) ? "currentColor" : "none"
                            }
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {post.likes || 0}
                          </span>
                        </button>
                        <span className="text-gray-500 text-sm">
                          {totalComments} Comments
                        </span>
                      </div>
                      <div className="mt-4">
                        <p className="font-regular">បញ្ចេញមតិបែប</p>
                        <select
                          value={identity}
                          onChange={(e) => setIdentity(e.target.value)}
                          className="font-regular w-36 h-10 my-3 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
                        >
                          <option value="Anonymous">Anonymous</option>
                          <option
                            value={`${userProfile?.firstName} ${userProfile?.lastName}`}
                          >
                            {userProfile
                              ? `${userProfile.firstName} ${userProfile.lastName}`
                              : "YourUsername"}
                          </option>
                        </select>
                        <textarea
                          placeholder="បញ្ចេញមតិរបស់អ្នក..."
                          value={newComment[post.id] || ""}
                          onChange={(e) =>
                            setNewComment((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          className="w-full font-regular p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-none h-24 text-sm"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNewComment(post.id);
                            }}
                            className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                      {visibleComments.map((comment) => (
  <div key={comment.id} className="bg-gray-200 p-2 rounded-lg mb-2">
    <span className="font-bold text-gray-600">
      {comment.identity === "Anonymous" ? "Anonymous" : comment.identity}:
    </span>
    <span>{comment.content}</span>
  </div>
))}
  {totalComments > 3 && (
    <button
      onClick={() => {
        setExpandedComments((prev) => {
          const newSet = new Set(prev);
          if (isExpanded) newSet.delete(post.id);
          else newSet.add(post.id);
          return newSet;
        });
      }}
      className="text-blue-500 hover:text-blue-700 text-sm mt-2 font-medium transition duration-200 cursor-pointer"
    >
      {isExpanded ? "Show Less" : `See All ${totalComments} Comments`}
    </button>
  )}
</div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div className="w-1/3 p-6 bg-gray-100 border-l border-gray-200 h-full overflow-y-auto">
          {profileLoading ? (
            <p>Loading profile...</p>
          ) : userProfile ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                គណនីយរបស់អ្នក
              </h3>
              <div className="flex flex-col items-center mb-6">
                <img
                  src={userProfile.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="rounded-full w-24 h-24 mb-3 border-2 border-gray-300 object-cover"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
                <p className="text-gray-900 font-bold text-xl">
                  {userProfile.firstName} {userProfile.lastName}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {userProfile.email}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Phone: {userProfile.phone || "Not set"}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Gender: {userProfile.gender || "Not set"}
                </p>
              </div>

              {isEditing ? (
                <form onSubmit={handleEditProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editProfile.phone}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          phone: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      value={editProfile.gender}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          gender: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          profileImage: e.target.files[0],
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  {editError && (
                    <p className="text-red-500 text-sm">{editError}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="font-regular w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
                  >
                    កែប្រែព័ត៌មាន
                  </button>
                  <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                      ចែករំលែក
                    </h3>
                    <textarea
                      placeholder="សរសេរអត្ថបទ......"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="font-regular w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 resize-none h-24 text-sm"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <select
                          value={identity}
                          onChange={(e) => setIdentity(e.target.value)}
                          className="w-36 h-10 border font-regular border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
                        >
                          <option
                            value="Anonymous"
                            className="text-sm cursor-pointer"
                          >
                            Anonymous
                          </option>
                          <option
                            value={`${userProfile?.firstName} ${userProfile?.lastName}`}
                            className="text-sm cursor-pointer"
                          >
                            {userProfile
                              ? `${userProfile.firstName} ${userProfile.lastName}`
                              : "Your Name"}
                          </option>
                        </select>
                        <label
                          htmlFor="file-upload"
                          className="flex items-center cursor-pointer"
                        >
                          <span className="font-regular inline-block px-3 py-1 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition duration-200 text-sm">
                            ភ្ជាប់ទៅកាន់រូបភាព
                          </span>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => setImages([...e.target.files])}
                            id="file-upload"
                            className="hidden"
                          />
                        </label>
                      </div>
                      <button
                        onClick={handleNewPost}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-sm cursor-pointer"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </>
              )}

              <h4 className="text-lg font-bold text-black mt-6 mb-3">
                ការចែករំលែករបស់អ្នក
              </h4>
              <div className="space-y-6 max-h-80 overflow-y-auto">
                {loading ? (
                  <p className="text-gray-500 text-sm">Loading posts...</p>
                ) : posts.filter((post) => post.user_id === userProfile._id)
                    .length === 0 ? (
                  <p className="text-gray-500 text-sm">No posts yet.</p>
                ) : (
                  posts
                    .filter((post) => post.user_id === userProfile._id)
                    .map((post) => (
                      <div
                        key={post.id}
                        className="bg-gray-50 rounded-lg p-4 transition duration-200"
                      >
                        {editingPostId === post.id ? (
                          <div>
                            <textarea
                              value={editPostContent}
                              onChange={(e) =>
                                setEditPostContent(e.target.value)
                              }
                              className="font-regular w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-24 text-sm mb-3"
                              placeholder="កែប្រែការផុសរបស់អ្នក..."
                            />
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {editPostExistingImages.map((img, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={img}
                                    alt="Existing Post Media"
                                    className="w-full h-24 object-cover rounded-lg"
                                    onError={(e) =>
                                      (e.target.src = "/default-image.png")
                                    }
                                  />
                                  <button
                                    onClick={() => handleDeleteImage(img)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                            <label
                              htmlFor={`edit-file-upload-${post.id}`}
                              className="flex items-center cursor-pointer mb-3"
                            >
                              <span className="font-regular inline-block px-3 py-1 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition duration-200 text-sm">
                                បន្ថែមរូបភាពថ្មី
                              </span>
                              <input
                                type="file"
                                multiple
                                onChange={(e) =>
                                  setEditPostImages([...e.target.files])
                                }
                                id={`edit-file-upload-${post.id}`}
                                className="hidden"
                              />
                            </label>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleSaveEdit(post.id)}
                                className="font-regular bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-200 text-sm cursor-pointer"
                              >
                                រក្សាទុក
                              </button>
                              <button
                                onClick={() => setEditingPostId(null)}
                                className="font-regular bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600 transition duration-200 text-sm cursor-pointer"
                              >
                                បោះបង់
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-gray-800 font-regular text-sm">
                                {post.identity}
                              </p>
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log(
                                      "Edit button clicked for post:",
                                      post.id
                                    );
                                    handleEditPost(post);
                                  }}
                                  className="font-regular bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-200 text-sm cursor-pointer"
                                >
                                  កែសម្រួល
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log(
                                      "Delete button clicked for post:",
                                      post.id
                                    );
                                    handleDeletePost(post.id);
                                  }}
                                  className="font-regular bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200 text-sm cursor-pointer"
                                >
                                  លុប
                                </button>
                              </div>
                            </div>
                            {post.status === "pending" && (
                              <p className="text-yellow-500 text-xs mb-2">
                                Pending Approval...
                              </p>
                            )}
                            <p className="text-gray-700 mt-1 line-clamp-2 font-regular">
                              {post.content}
                            </p>
                            {post.image_urls && post.image_urls.length > 0 && (
                              <div className="mt-2">
                                {renderImageGrid(post.image_urls, post)}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>
          ) : (
            <p>No profile data available</p>
          )}
        </div>

        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedPost.image_urls[currentImageIndex]}
                alt="Full Screen Media"
                className="object-contain max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
                onError={(e) => (e.target.src = "/default-image.png")}
              />
              {selectedPost.image_urls.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className={`absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-200 ${
                      currentImageIndex === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={currentImageIndex === 0}
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextImage}
                    className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-200 ${
                      currentImageIndex === selectedPost.image_urls.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      currentImageIndex === selectedPost.image_urls.length - 1
                    }
                  >
                    →
                  </button>
                </>
              )}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200 text-lg font-semibold"
              >
                ✕
              </button>
              <div className="absolute bottom-4 text-white text-sm">
                {currentImageIndex + 1} / {selectedPost.image_urls.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;

