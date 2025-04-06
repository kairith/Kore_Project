import React, { useState } from "react";

function ForgotPassword({ closeForgotPassword, openResetPassword }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`លេខសម្ងាត់បញ្ចូនទៅ ${phoneNumber}`);

    // ✅ Open Reset Password after 1 second and close Forgot Password
    setTimeout(() => {
      closeForgotPassword();
      openResetPassword();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeForgotPassword}
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

        {/* Title */}
        <h2 className="text-center text-lg font-bold mb-4">ភ្លេចលេខសម្ងាត់</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-regular block mb-1">បញ្ចូលលេខទូរស័ព្ទ</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mt-2 font-regular"
              placeholder="បំពេញលេខទូរស័ព្ទ"
              required
            />
          </div>
          <button
            type="submit"
            className="font-regular w-full mt-2 bg-blue-500 duration-200 shadow-xl text-white py-2 rounded hover:bg-blue-600 cursor-pointer mb-6"
          >
            បញ្ជូន
          </button>
          {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
