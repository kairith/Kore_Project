import { useState, useEffect } from "react";
import axios from "axios";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPendingPosts();
    
  }, []);

  const fetchPendingPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/posts/pending/");
      console.log(response.data); // Debug: Check if user data exists
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching pending posts:", error);
    }
  };
  

  

  const updatePostStatus = async (postId, action) => {
    const confirmationMessage = action === "approve" 
      ? "Are you sure you want to approve this post?" 
      : "Are you sure you want to reject this post?";
  
    if (!window.confirm(confirmationMessage)) {
      return; // Do nothing if user cancels
    }
  
    try {
      if (action === "approve") {
        await axios.put(`http://localhost:8000/admin/posts/${postId}/approve/`);
        setPosts((prevPosts) => 
          prevPosts.map((post) => 
            post.id === postId ? { ...post, status: "approved" } : post
          )
        );
      } else if (action === "reject") {
        await axios.delete(`http://localhost:8000/admin/posts/${postId}/reject/`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.error(`Error updating post:`, error);
    }
  };
  
  
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Posts</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Post Image</th>
            <th className="border px-4 py-2">Content</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id} className="border">
                <td className="border px-4 py-2"> {post.user ? `${post.user.firstName} ${post.user.lastName}` : "Unknown User"}</td>
                <td className="border px-4 py-2">
                  {post.image_urls.length > 0 ? (
                    <img src={post.image_urls[0]} alt="Post" className="w-20 h-20 object-cover" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="border px-4 py-2">{post.content}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => updatePostStatus(post.id, "approve")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                   >
                    Approve
                  </button>
                  <button
                    onClick={() => updatePostStatus(post.id, "reject")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                   >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No Request posts yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
