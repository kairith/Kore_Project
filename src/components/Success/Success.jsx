import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Success({ closeSuccess }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => { // Close the success popup
      navigate("/"); // Navigate to homepage
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [closeSuccess, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96 text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">ជោគជ័យ!</h2>
        <p className="text-lg mb-4 font-regular">
          {closeSuccess.name === "resetAndGoLogin"
            ? "ការចូលគណនីរបស់អ្នកបានជោគជ័យ"
            : "ការចុះឈ្មោះរបស់អ្នកបានជោគជ័យ"}
        </p>
        <button
          onClick={() => {
            closeSuccess();
            navigate("/");
          }}
          className="bg-blue-500 shadow-xl duration-200 font-regular text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
        >
          ទៅទំព័រដើម
        </button>
      </div>
    </div>
  );
}

export default Success;