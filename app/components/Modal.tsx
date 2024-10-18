import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xs max-h-full text-center">
        <h2
          className={`text-xl font-bold py-4 ${
            type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {title}
        </h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`px-4 py-2 ${
            type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white text-base font-medium rounded-md w-full shadow-sm hover:${
            type === "error" ? "bg-red-600" : "bg-green-600"
          } focus:outline-none focus:ring-2 focus:ring-${
            type === "error" ? "red-300" : "green-300"
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
