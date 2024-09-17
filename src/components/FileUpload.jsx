// import { FileUpload } from "../components/ui/file-upload";

import PropTypes from 'prop-types';

export function FileUploadDemo({ onChange }) {
FileUploadDemo.propTypes = {
  onChange: PropTypes.func.isRequired,
};
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(e); // Call the onChange handler passed from the parent component
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="file-input" 
      />
    </div>
  );
}
