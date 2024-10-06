import React from 'react';

const Socials = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Social Profile</h2>
      <p>You can update your social media details here.</p>
      <form className="space-y-4">
        <div>
          <label className="block">Linkedin</label>
          <input type="text" placeholder="johndoe" className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block">Github</label>
          <input type="text" placeholder="johndoe" className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block">Twitter</label>
          <input type="text" placeholder="johndoe" className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block">Website</label>
          <input type="text" placeholder="https://www.portfolio.com" className="border p-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
      </form>
    </div>
  );
};

export default Socials;
