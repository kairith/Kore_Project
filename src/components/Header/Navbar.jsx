import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Header/Logo_Kore.jpg";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import AuthForm from "../SignUp/SignUp";
import { AuthContext } from "../../AuthContext";

const NavbarMenu = [
  { id: 1, title: "អំពីយើងខ្ញុំ", path: "/អំពីយើងខ្ញុំ" },
  {
    id: 2,
    title: "ការអប់រំ",
    path: "/ការអប់រំ",
    dropdown: [
      { id: 1, title: "អត្តបទ", path: "/ការអប់រំ/អត្តបទ" },
      { id: 2, title: "វីដេអូ", path: "/ការអប់រំ/វីដេអូ" },
    ],
  },
  { id: 3, title: "សហគម៍", path: "/សហគម៍" },
  { id: 4, title: "ពិភាក្សាជាមួយAI", path: "/ពិភាក្សាជាមួយAI" },
  { id: 5, title: "ទាក់ទងមកពួកយើង", path: "/ទាក់ទងមកពួកយើង" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const { user, token, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // In your Navbar component's useEffect
  useEffect(() => {
    const protectedRoutes = ["/សហគម៍", "/ពិភាក្សាជាមួយAI"];
    if (protectedRoutes.includes(location.pathname) && !user) {
      setShowAuthForm(true);
      navigate("/"); // Redirect to home but keep showing auth form
    }
  }, [location, user, navigate]);

  const handleProtectedLinkClick = (path) => {
    if (!user) {
      setShowAuthForm(true);
      navigate("/"); // Redirect to home but show auth form
    } else {
      navigate(path);
    }
  };

  const handleAuthSuccess = (userProfile) => {
    const { image, firstName, lastName, token } = userProfile;
    login({ image, firstName, lastName, profileImage: image }, token);
    setShowAuthForm(false);

    // Check if there was a protected route the user tried to access
    const protectedRoutes = ["/សហគម៍", "/ពិភាក្សាជាមួយAI"];
    if (protectedRoutes.includes(location.pathname)) {
      // Already on the protected route, no need to redirect
      return;
    }

    // Redirect to a default protected route or stay on current page
    navigate("/"); // Or whatever default you prefer
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleDropdown = (menuId) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  const renderMenuItems = () => {
    return NavbarMenu.map((menu) => {
      const isProtected = ["/សហគម៍", "/ពិភាក្សាជាមួយAI"].includes(menu.path);

      return (
        <li key={menu.id} className="relative group">
          {isProtected && !user ? (
            <button
              onClick={() => handleProtectedLinkClick(menu.path)}
              className={`font-regular font-medium text-lg transition duration-300 ${
                location.pathname === menu.path
                  ? "text-blue-400"
                  : "text-gray-800 hover:text-blue-300"
              }`}
            >
              {menu.title}
            </button>
          ) : (
            <Link
              to={menu.path}
              className={`font-regular font-medium text-lg transition duration-300 ${
                location.pathname === menu.path
                  ? "text-blue-400"
                  : "text-gray-800 hover:text-blue-300"
              }`}
            >
              {menu.title}
            </Link>
          )}
          {/* ... dropdown menu code ... */}
          {menu.dropdown && (
            <ul className="absolute left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block bg-white shadow-lg rounded-lg p-2 w-40">
              {menu.dropdown.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 border-gray-200"
                >
                  <Link
                    to={item.path}
                    className="block font-regular text-gray-800 hover:text-sky-300 transition duration-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between px-6">
        {/* Logo Section */}
        <div className="w-20 h-20 lg:ml-5 flex-shrink-0 flex items-center">
          <Link to="/">
            <img
              className="w-16 h-16 object-contain cursor-pointer"
              src={Logo}
              alt="Logo-Kore"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex md:flex flex-grow justify-center items-center">
          <ul className="flex items-center lg:space-x-8">
            {renderMenuItems()}
            {/* {NavbarMenu.map((menu) => (
              <li key={menu.id} className="relative group">
                <Link
                  to={menu.path}
                  className={`font-regular font-medium text-lg transition duration-300 ${
                    location.pathname === menu.path
                      ? "text-blue-400"
                      : "text-gray-800 hover:text-blue-300"
                  }`}
                >
                  {menu.title}
                </Link>
                {menu.dropdown && (
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block bg-white shadow-lg rounded-lg p-2 w-40">
                    {menu.dropdown.map((item) => (
                      <li
                        key={item.id}
                        className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 border-gray-200"
                      >
                        <Link
                          to={item.path}
                          className="block font-regular text-gray-800 hover:text-sky-300 transition duration-300"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))} */}
          </ul>
        </div>

        {/* User Profile or Auth Button (Desktop) */}
        {user ? (
          <div className="relative flex items-center lg:mr-5">
            <img
              src={user.profileImage || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            <span className="ml-2 text-gray-800 font-medium hidden lg:block">
              {user.firstName} {user.lastName}
            </span>
            {isMenuOpen && (
              <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg top-full">
                {/* <Link
                  to="/profile"
                  className="block font-regular px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  បញ្ជីព័ត៌មាន
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="block font-regular w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  ចាកចេញ
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAuthForm(true)}
            className="primary-btn font-bold hidden lg:flex md:flex items-center bg-blue-300 text-white px-4 py-2 rounded-lg duration-200 shadow-[0px_10px_8px_-7px_#d1d5db] hover:bg-sky-300 hover:shadow-sky-300 transition lg:mr-5 cursor-pointer"
          >
            <FaUserCircle className="w-5 h-5 mr-2" />
            បង្កើតគណនី
          </button>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-gray-800 hover:text-blue-300 transition duration-300 cursor-pointer"
          >
            {isMenuOpen ? (
              <AiOutlineClose className="text-2xl text-gray-800" />
            ) : (
              <RxHamburgerMenu className="text-2xl text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed font-regular top-20 right-0 rounded-lg h-full w-56 bg-white shadow-lg p-5 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <ul className="flex flex-col space-y-4">
          {NavbarMenu.map((menu) => (
            <li key={menu.id} className="relative">
              {menu.dropdown ? (
                <>
                  <div className="flex justify-between items-center">
                    <Link
                      to={menu.path}
                      className={`text-lg font-regular transition duration-300 ${
                        location.pathname === menu.path
                          ? "text-blue-400"
                          : "text-gray-800 hover:text-blue-300"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {menu.title}
                    </Link>
                    <button
                      onClick={() => toggleDropdown(menu.id)}
                      className="text-gray-600 ml-2"
                    >
                      {activeDropdown === menu.id ? "-" : "+"}
                    </button>
                  </div>
                  {activeDropdown === menu.id && (
                    <ul className="mt-2 bg-gray-100 rounded-lg shadow-md p-2">
                      {menu.dropdown.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-200 rounded-md"
                        >
                          <Link
                            to={item.path}
                            className="block text-gray-800 hover:text-sky-500 transition duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={menu.path}
                  className={`text-lg transition duration-300 ${
                    location.pathname === menu.path
                      ? "text-blue-400"
                      : "text-gray-800 hover:text-blue-300"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {menu.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* User Profile or Auth Button (Mobile) */}
        <div className="mt-4">
          {user ? (
            <div className="flex items-center">
              <img
                src={user.profileImage || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <span className="ml-2 text-gray-800 font-medium">
                {user.firstName} {user.lastName}
              </span>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthForm(true)}
              className="flex w-full bg-blue-300 text-white px-4 py-2 rounded-lg duration-200 shadow-[0px_10px_8px_-7px_#d1d5db] hover:bg-sky-300 hover:shadow-sky-300 transition cursor-pointer"
            >
              <FaUserCircle className="w-5 h-5 mr-2" />
              បង្កើតគណនី
            </button>
          )}
        </div>
      </div>

      {/* AuthForm Popup */}
      {showAuthForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-opacity-50">
          <AuthForm
            closeModal={() => setShowAuthForm(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
