import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import UploadBlog from "./UploadBlog";
import VideoUpload from "./uploadVideo"; // Match the exact filename
import {
  FaUserShield,
  FaSignOutAlt,
  FaEdit,
  FaVideo,
  FaEye,
  FaUsers,
} from "react-icons/fa"; // Import icons
import DisplayBlogs from "./DisplayBlog"; // Import the DisplayBlogs component
import VideoListAdmin from "./viewvideo"; // Import VideoList component
import UserList from "./adminUserCount"; // Import the UserList component
import ManageUserPosts from "./ManageUser";
import AdminPosts from "./UserRequestPost";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); // State for modal visibility
  const [currentSection, setCurrentSection] = useState("upload"); // State to control the current section (Upload, View Blogs, etc.)
  const [userCount, setUserCount] = useState(0); // State to store user count

  useEffect(() => {
    if (!user) {
      navigate("/login/admin/project");
    } else {
      fetchUserCount(); // Fetch user count when user is logged in
    }
  }, [user, navigate]);

  const fetchUserCount = async () => {
    try {
      const response = await fetch("http://localhost:8000/all-users"); // This endpoint returns all users
      const data = await response.json();

      // Set the user count based on the length of the returned array
      setUserCount(data.length); // Set the user count from the array length
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login/admin/project");
  };

  const handleLogoutConfirmation = () => {
    setLogoutModalOpen(true); // Open the modal on logout button click
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false); // Close the modal if user cancels
  };

  const handleLogoutConfirm = () => {
    handleLogout(); // Confirm and log out the user
    setLogoutModalOpen(false); // Close the modal
  };

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  // Function to switch sections based on the clicked item
  const switchSection = (section) => {
    setCurrentSection(section);
  };
  
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4E8BC4] text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaUserShield className="mr-2" /> Admin Dashboard
          </h2>
          <nav>
            <ul className="space-y-4">
              <li
                onClick={() => switchSection("upload")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                <FaEdit /> <span>Upload Blog</span>
              </li>
              <li
                onClick={() => switchSection("videoUpload")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                <FaVideo /> <span>Upload Video</span>
              </li>
              <li
                onClick={() => switchSection("viewBlogs")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                <FaEye /> <span>Page's Blogs</span>
              </li>
              <li
                onClick={() => switchSection("viewVideos")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                <FaVideo /> <span>Page's Videos</span>
              </li>
              <li
                onClick={() => switchSection("viewUsers")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                <FaUsers /> <span>View Users</span>
              </li>
              <li
                onClick={() => switchSection("userPosts")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                <FaUsers /> <span>User's Posts</span>
              </li>
              <li
                onClick={() => switchSection("UserRequestPost")}
                className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                <FaUsers /> <span>Posts Request</span>
              </li>
              
              
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogoutConfirmation}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white shadow-md p-4 rounded-md mb-6">
          <h2 className="text-xl font-bold">Welcome Admin, {user.email}</h2>
          <p className="text-gray-600">
            Manage your website here.
          </p>
          {/* Display User Count */}
          <p className="text-lg mt-2">Total Users: {userCount}</p>
        </div>

        {/* Conditional Section Rendering */}
        {currentSection === "upload" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Upload Blog
            </h3>
            <UploadBlog />
          </div>
        )}
        {currentSection === "videoUpload" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Upload Video
            </h3>
            <VideoUpload />
          </div>
        )}
        {currentSection === "viewBlogs" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Manage Blogs
            </h3>
            <DisplayBlogs /> {/* Display Blogs Component */}
          </div>
        )}
        {currentSection === "viewVideos" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Manage Videos
            </h3>
            <VideoListAdmin /> {/* VideoList Component */}
          </div>
        )}
        {currentSection === "viewUsers" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              User List
            </h3>
            <UserList /> {/* User List Component */}
          </div>
        )}
        {currentSection === "userPosts" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Manage User Posts
            </h3>
            <ManageUserPosts /> {/* Manage User Posts Component */}
          </div>
        )}
        {currentSection === "UserRequestPost" && (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4 text-center">
      User Request Post
    </h3>
    <AdminPosts /> {/* Now correctly showing pending posts */}
  </div>
)}

      </main>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-[#FF99BE] text-white rounded hover:bg-[#FF99BE]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
