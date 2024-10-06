import React from 'react';

const Accounts = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Accounts</h2>
      <p>You can manage your accounts here.</p>
      <form className="space-y-4">
        <div>
          <label className="block">Codolio Id:</label>
          <input type="text" value="vivek02" className="border p-2 rounded w-full" readOnly />
        </div>
        <div>
          <label className="block">Email:</label>
          <input type="email" value="asus.regular.use@gmail.com" className="border p-2 rounded w-full" readOnly />
        </div>
        <h3 className="font-bold mt-4">Update Password</h3>
        <div>
          <label className="block">Original Password:</label>
          <input type="password" className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block">New Password:</label>
          <input type="password" className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block">Confirm Password:</label>
          <input type="password" className="border p-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
      </form>
    </div>
  );
};

export default Accounts;
