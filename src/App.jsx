import React from "react"; // ✅ No need for `useContext` here
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import Chatbot from "./pages/AiChatbot";
import AboutUs from "./pages/AboutPage";
import Contact from "./pages/ContactUs.jsx";
import Educational from "./pages/Educational";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"; // ✅ Dashboard page
import PrivateRoute from "./PrivateRoute"; // ✅ Correct way
import ResetPassword from "./pages/ResetPassword";
import VideoUpload from "./pages/uploadVideo";
import UploadBlog from "./pages/UploadBlog";
import VideoListUser from "./pages/userVideo";
import UserBlogs from "./pages/userBlog";
import AiChatbots from "./pages/AiChatbot.jsx";
import AiChatbot from "./pages/askTest";
import ChatbotJson from "./pages/astTestJson.jsx";
import VideoListAdmin from "./pages/viewvideo";
import Blog from "./pages/Blog";
import Video from "./pages/Videos.jsx";
import Community from "./pages/Community";
import ProtectedRoute from "../src/components/RedirectRoute/ProtectedRoute.jsx";
import ChatBotUI from "./components/AiChatbot/ChatBot.jsx";
import ViewBlog from "./components/ViewBlogPage/ViewBlog.jsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ask-test" element={<AiChatbot />} /> // ✅ Ask AI page
      <Route path="/chatbotjson" element={<ChatbotJson />} /> // ✅ Chatbot JSON
      page
      <Route path="/admin/uploadvideo" element={<VideoUpload />} />
      <Route path="/admin/uploadblog" element={<UploadBlog />} />
      <Route path="/displayblog" element={<UserBlogs />} /> // ✅ Display blog
      page
      <Route path="/viewvideo" element={<VideoListAdmin />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route
        path="/សហគម៍"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route path="/អំពីយើងខ្ញុំ" element={<AboutUs />} />
      <Route path="/ទាក់ទងមកពួកយើង" element={<Contact />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/ការអប់រំ" element={<Educational />} />
      <Route path="/login/admin/project" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} /> // ✅
      Password reset page
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/ពិភាក្សាជាមួយAI"
        element={
          <ProtectedRoute>
            <AiChatbots />
          </ProtectedRoute>
        }
      />
      <Route path="/ការអប់រំ/វីដេអូ" element={<Video />} />
      <Route path="/ការអប់រំ/អត្តបទ" element={<Blog />} />
      <Route path="/អានអត្តបទ/:id" element={<ViewBlog />} />
    </Routes>
  );
};

export default App;
