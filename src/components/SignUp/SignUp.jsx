import { useState, useContext, useEffect } from "react"; // Add useEffect for Success component
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import VerifyCode from "../Verify/verifyCode";
import Success from "../Success/Success";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPasword/resetPassword";
import InputPassword from "../InputPassword/InputPassword";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showInputPasswordPopup, setShowInputPasswordPopup] = useState(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);
  const [successFromLogin, setSuccessFromLogin] = useState(false);

  const resetAndGoSignup = () => {
    setShowVerifyPopup(false);
    setShowSuccessPopup(false);
    setShowInputPasswordPopup(false);
    setShowForgotPasswordPopup(false);
    setShowResetPasswordPopup(false);
    setIsLogin(false);
  };

  const resetAndGoLogin = () => {
    setShowVerifyPopup(false);
    setShowSuccessPopup(false);
    setShowInputPasswordPopup(false);
    setShowForgotPasswordPopup(false);
    setShowResetPasswordPopup(false);
    setIsLogin(true);
  };

  return (
    <>
      {showInputPasswordPopup && !showVerifyPopup && (
        <InputPassword
          closeModal={() => setShowInputPasswordPopup(false)}
          openSignupForm={() => setIsLogin(false)}
          openVerifyCode={() => {
            setShowInputPasswordPopup(false);
            setShowVerifyPopup(true);
          }}
        />
      )}

      {showVerifyPopup && (
        <VerifyCode
          closeModal={() => setShowVerifyPopup(false)}
          openSignupForm={resetAndGoSignup}
        />
      )}

      {showForgotPasswordPopup && !showResetPasswordPopup && (
        <ForgotPassword
          closeForgotPassword={() => setShowForgotPasswordPopup(false)}
          openResetPassword={() => {
            setShowForgotPasswordPopup(false);
            setShowResetPasswordPopup(true);
          }}
        />
      )}

      {showResetPasswordPopup && (
        <ResetPassword
          closeResetPassword={() => setShowResetPasswordPopup(false)}
        />
      )}

      {showSuccessPopup && (
        <Success
          closeSuccess={successFromLogin ? resetAndGoLogin : resetAndGoSignup}
        />
      )}

      {!showInputPasswordPopup &&
        !showVerifyPopup &&
        !showForgotPasswordPopup &&
        !showResetPasswordPopup &&
        !showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50 p-4">
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md relative overflow-auto">
              <div className="flex justify-end mb-4">
                <button
                  onClick={closeModal}
                  type="button"
                  className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
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
              </div>

              <div className="flex justify-center gap-30 m-5 border-b pb-2">
                <h2
                  className={`font-bold mb-3 cursor-pointer ${
                    isLogin ? "text-blue-500" : "text-gray-600"
                  }`}
                  onClick={() => setIsLogin(true)}
                >
                  ចូលគណនី
                </h2>
                <h2
                  className={`font-bold mb-3 cursor-pointer ${
                    !isLogin ? "text-blue-500" : "text-gray-600"
                  }`}
                  onClick={() => setIsLogin(false)}
                >
                  ចុះឈ្មោះ
                </h2>
              </div>

              {isLogin ? (
                <LoginForm
                  showSuccess={() => {
                    setShowSuccessPopup(true);
                    setSuccessFromLogin(true);
                  }}
                  openForgotPassword={() => setShowForgotPasswordPopup(true)}
                />
              ) : (
                <SignupForm
                  openInputPassword={() => setShowInputPasswordPopup(true)}
                  showSuccess={() => setShowSuccessPopup(true)}
                />
              )}
            </div>
          </div>
        )}
    </>
  );
}

function LoginForm({ showSuccess, openForgotPassword }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch("http://localhost:5020/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      login(data.token, data.user);

      // Use sessionStorage instead of localStorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      showSuccess();

      // Navigation happens in Success component now
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="font-regular block text-sm mb-1">អ៊ីមែល</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="font-regular w-full p-2 border border-gray-300 rounded"
          placeholder="បំពេញអ៊ីមែល"
          required
          disabled={status.loading}
        />
      </div>
      <div className="mb-4">
        <label className="font-regular block text-sm mb-1">លេខសម្ងាត់</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded font-regular"
          placeholder="បំពេញលេខសម្ងាត់"
          required
          disabled={status.loading}
        />
      </div>
      {status.error && (
        <p className="text-red-500 text-sm mb-2">{status.error}</p>
      )}
      <button
        type="submit"
        className="font-regular w-full bg-blue-500 shadow-xl duration-200 text-white py-2 mt-2 rounded cursor-pointer hover:bg-blue-600 disabled:bg-blue-300"
        disabled={status.loading}
      >
        {status.loading ? "កំពុងចូល..." : "ចូលគណនី"}
      </button>
      <p
        className="font-regular text-blue-500 duration-200 text-right text-sm mt-4 cursor-pointer hover:text-blue-600"
        onClick={openForgotPassword}
      >
        ភ្លេចលេខសម្ងាត់?
      </p>
      <SocialLogin />
    </form>
  );
}

function SignupForm({ openInputPassword, showSuccess }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true, error: null }));

    console.log("Signup Form Data:", formData); // Debug

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setStatus((prev) => ({
        ...prev,
        loading: false,
        error: "Passwords do not match",
      }));
      return;
    }

    try {
      const response = await fetch("http://localhost:5020/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phoneNumber, // Match backend expectation
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Signup API Response:", data);

      if (!response.ok) throw new Error(data.message || "Signup failed");
      if (!data.token || !data.user)
        throw new Error("Invalid response from server. Token or user missing.");

      login(data.token, data.user);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      console.log(
        "Stored Token in sessionStorage:",
        sessionStorage.getItem("token")
      ); // Debug
      showSuccess();

      // Navigation happens in Success component now
    } catch (error) {
      console.error("Signup Error:", error.message);
      setStatus((prev) => ({ ...prev, loading: false, error: error.message }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-4">
        <div className="mb-4">
          <label className="font-regular block text-sm">គោត្តនាម</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded mt-2 w-full font-regular"
            placeholder="បំពេញគោត្តនាម"
            required
            disabled={status.loading}
          />
        </div>
        <div className="mb-4">
          <label className="font-regular block text-sm">នាមខ្លួន</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded mt-2 w-full font-regular"
            placeholder="បំពេញនាមខ្លួន"
            required
            disabled={status.loading}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="font-regular block text-sm mb-1">លេខទូរស័ព្ទ</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber} // Fixed from formData.phone to formData.phoneNumber
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded font-regular"
          placeholder="បំពេញលេខទូរស័ព្ទ"
          required
          disabled={status.loading}
        />
      </div>
      <div className="mb-4">
        <label className="font-regular block text-sm mb-1">អ៊ីមែល</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded font-regular"
          placeholder="បំពេញអ៊ីមែល"
          required
          disabled={status.loading}
        />
      </div>
      <div className="mb-4">
        <label className="font-regular block text-sm mb-1">លេខសម្ងាត់</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded font-regular"
          placeholder="បំពេញលេខសម្ងាត់"
          required
          disabled={status.loading}
        />
      </div>
      <div className="mb-4">
        <label className="font-regular block text-sm mb-1">
          បញ្ជាក់លេខសម្ងាត់
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded font-regular"
          placeholder="បញ្ជាក់លេខសម្ងាត់"
          required
          disabled={status.loading}
        />
      </div>
      {status.error && (
        <p className="text-red-500 text-sm mb-2">{status.error}</p>
      )}
      <button
        type="submit"
        className="font-regular w-full bg-blue-500 duration-200 shadow-xl text-white py-2 rounded cursor-pointer hover:bg-blue-600 disabled:bg-blue-300"
        disabled={status.loading}
      >
        {status.loading ? "កំពុងចុះឈ្មោះ..." : "បង្កើតគណនី"}
      </button>
      <SocialLogin />
    </form>
  );
}

function SocialLogin() {
  return (
    <div className="text-center mt-4">
      <p className="font-regular text-gray-600 m-4">ចូលគណនីតាមរយៈ</p>
      <div className="flex justify-center gap-4 mt-2">
        <FaFacebook className="text-blue-600 text-4xl cursor-pointer" />
        <FcGoogle className="text-red-500 text-4xl cursor-pointer" />
      </div>
    </div>
  );
}
