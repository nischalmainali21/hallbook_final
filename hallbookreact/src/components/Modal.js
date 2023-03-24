import React from "react";

const Modal = ({ open, message, onClose }) => {
  const buttonfixedclass = "buttonfixedclass";
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed z-10  flex min-h-screen w-[100%] overflow-auto bg-gray-100"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="fixed top-[40%] left-[50%] flex w-[100%] max-w-[600px] -translate-x-2/4 -translate-y-2/4 flex-col gap-6 rounded-md bg-gray-200 p-6 shadow-lg"
      >
        <div className="p-1 text-3xl font-bold">{message}</div>
        <div className="flex items-center justify-around gap-4 p-2">
          <button
            onClick={onClose}
            className={`${buttonfixedclass} bg-red-500 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800`}
          >
            Cancel
          </button>
          <button
            className={`${buttonfixedclass} bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
