import React from 'react';

const Visibility = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Visibility</h2>
      <p>You can manage your stats visibility here.</p>
      <form className="space-y-4">
        <div>
          <label className="block">Choose Visibility</label>
          <select className="border p-2 rounded w-full">
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
      </form>
    </div>
  );
};

export default Visibility;
