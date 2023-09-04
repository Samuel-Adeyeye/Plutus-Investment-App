import React from 'react';

interface DeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel, onDelete }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='bg-white w-1/2 p-6 rounded-lg shadow-lg'>
        <p className='text-center mb-4'>Are you sure you want to delete this company?</p>
        <div className='flex justify-end'>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2'
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
