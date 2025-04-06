import React, { useState } from 'react';
import Success from "../Success/Success";

function InputPassword({ closeModal, openSignupForm, openVerifyCode }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-red-500"); // ✅ Default error color
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("⚠️ លេខសម្ងាត់មិនត្រូវគ្នា។ សូមពិនិត្យម្តងទៀត!");
      setMessageColor("text-red-500"); // ❌ Show error in red
      return;
    }

    console.log("ផ្ទៀងផ្ទាត់លេខសម្ងាត់:", password);
    setMessage("✅ លេខសម្ងាត់ត្រូវបានបង្កើតដោយជោគជ័យ!");
    setMessageColor("text-blue-500"); // ✅ Show success in blue

    // ✅ Go to VerifyCode after 1 second
    setTimeout(() => {
      closeModal(); // Close password modal
      openVerifyCode(); // Open VerifyCode modal
    }, 1000);
  };

  return (
    <>
      {!showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  closeModal(); // ✅ Close this modal
                  openSignupForm(); // ✅ Return to Signup Form
                }}
                type="button"
                className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-center mb-6">
              បញ្ចូលលេខសម្ងាត់ថ្មី
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Password Input */}
              <div className="mb-3">
                <label className="block text-gray-700 font-regular">លេខសម្ងាត់ថ្មី</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full text-lg font-regular"
                  placeholder="បំពេញលេខសម្ងាត់ថ្មី"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div className="mb-3">
                <label className="block text-gray-700 font-regular">បញ្ជាក់លេខសម្ងាត់</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full text-lg font-regular"
                  placeholder="បំពេញលេខសម្ងាត់"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="font-regular w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-2 cursor-pointer"
              >
                បញ្ជូន
              </button>

              {/* Success or Error Message */}
              {message && <p className={`text-center mt-4 ${messageColor}`}>{message}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default InputPassword;
