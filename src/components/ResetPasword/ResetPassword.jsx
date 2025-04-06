import React, { useState } from "react";
import Success from "../Success/Success";

function ResetPassword({ closeResetPassword }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMessage("✅ ជោគជ័យ! លេខសម្ងាត់ត្រូវបានផ្លាស់ប្តូរ");

      // ✅ Show Success popup after 1 second
      setTimeout(() => {
        setShowSuccessPopup(true);
      }, 1000);
    } else {
      setMessage("⚠️ សូមបញ្ជាក់លេខសម្ងាត់ឡើងវិញ!");
    }
  };
  
  return (
    <>
      {/* ✅ Show Success popup in the center */}
      {showSuccessPopup ? (
        <Success closeSuccess={closeResetPassword} />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto relative">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={closeResetPassword}
                type="button"
                className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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

            <h2 className="text-xl font-bold text-center mb-6">
              ផ្លាស់ប្តូរលេខសម្ងាត់
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-regular text-gray-700">
                  បញ្ចូលលេខសម្ងាត់ថ្មី
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full mt-1 font-regular"
                  placeholder="បំពេញលេខសម្ងាត់"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-regular text-gray-700">
                  បញ្ជាក់លេខសម្ងាត់ម្តងទៀត
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full mt-1 font-regular"
                  placeholder="បំពេញលេខសម្ងាត់"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 font-regular bg-blue-500 shadow-xl text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                ផ្ទៀងផ្ទាត់
              </button>

              {message && (
                <p className="mt-4 text-center text-gray-700">{message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
