import React, { useState } from 'react';
import Success from "../Success/Success";

function VerifyCode({ closeModal, openSignupForm }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ផ្ទៀងផ្ទាត់លេខសម្ងាត់:", code);
    setMessage(`✅ លេខសម្ងាត់ ${code} ត្រូវបានផ្ទៀងផ្ទាត់ដោយជោគជ័យ!`);

    // Show Success popup after verification
    setTimeout(() => {
      setShowSuccessPopup(true); // Show success popup
    }, 1000);
  };

  const handleResendCode = () => {
    setMessage("លេខសម្ងាត់ត្រូវបានបញ្ចូនឡើងវិញ!");
  };

  return (
    <>
      {!showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-110 relative">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  closeModal(); // Close VerifyCode modal
                  openSignupForm(); // Go back to Signup Form
                }}
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
            <h2 className="font-regular text-lg text-center font-semibold mb-6">
              ផ្ទៀងផ្ទាត់ជាមួយលេខសម្ងាត់
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="font-regular block mb-1">បញ្ចូលលេខសម្ងាត់</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full text-lg font-regular"
                  placeholder="បំពេញលេខសម្ងាត់"
                  required
                />
              </div>
              <p
                className="font-regular text-blue-500 cursor-pointer mb-4"
                onClick={handleResendCode}
              >
                បញ្ចូនលេខសម្ងាត់ម្តងទៀត
              </p>
              <button
                type="submit"
                className="font-regular w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-5 mt-2 cursor-pointer"
              >
                បញ្ជូន
              </button>
              {message && <p className="font-regular mt-4 text-center text-gray-600">{message}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Show Success popup in the center after submitting */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <Success closeSuccess={openSignupForm} /> {/* Pass openSignupForm here */}
        </div>
      )}
    </>
  );
}

export default VerifyCode;