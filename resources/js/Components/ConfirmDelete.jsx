import React from "react";

const ConfirmDelete = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-start pl-80 items-center z-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Apstipriniet dzēšanu</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{message}</p>

        <div className="mt-4 flex justify-end gap-2">
        <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
            Dzēst
        </button>
        <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg">
            Atcelt
        </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;