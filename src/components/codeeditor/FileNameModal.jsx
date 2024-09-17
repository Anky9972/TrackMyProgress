// components/FileNameModal.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const FileNameModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [fileName, setFileName] = useState('');

  const handleSubmit = () => {
    if (fileName.trim()) {
      onSubmit(fileName);
      setFileName(''); // Clear the input after submission
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="File Name Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl font-bold mb-4">Enter File Name</h2>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
        placeholder="File name"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};
FileNameModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FileNameModal;
