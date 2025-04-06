import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const ManageUserPosts = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get("http://localhost:8000/posts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const postData = response.data;
      console.log("Posts fetched:", postData);

      // If no posts are returned, handle it gracefully
      if (!postData || postData.length === 0) {
        setPosts([]);
      } else {
        setPosts(postData);
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(`Failed to fetch posts: ${error.response.data.detail || error.message}`);
      } else {
        setError(error.message || "Failed to fetch posts");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId, firstName) => {
    if (!postId) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the post by ${firstName || "Unknown"}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setError(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      setError(`Failed to delete post: ${error.response?.data?.detail || error.message}`);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading posts...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">Manage User Posts</h3>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Post Image</th>
            <th className="border border-gray-300 px-4 py-2">Content</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  {post.user ? `${post.user.firstName} ${post.user.lastName}` : "Unknown User"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {post.image_urls?.length > 0 ? (
                    <img
                      src={post.image_urls[0]}
                      alt="Post"
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{post.content}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {post.status || "approved"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      handleDelete(post.id, post.user?.firstName || "Unknown")
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No posts available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUserPosts;