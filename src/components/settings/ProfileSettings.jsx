import { useEffect, useState } from "react";
import { auth } from "../../services/firebase"; // Import your Firebase auth service
function ProfileSettings() {
  const [user, setUser] = useState('');
  useEffect(() => {
    // Fetch user information after login
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName,
        avatar: currentUser.photoURL || 'https://via.placeholder.com/150',
        email: currentUser.email,
      });
    }
  }, []);
    return (
      <div>
        <h3 className="text-2xl font-semibold mb-4">Profile Settings</h3>
        <div className="flex items-center space-y-2 flex-col justify-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-lg"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold text-gray-800">{user.name || 'User name'}</h1>
            <p className="text-gray-600">{user.email}</p>
            
          </div>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email address"
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Save Changes
          </button>
        </form>
      </div>
    );
  }
  
  export default ProfileSettings;
  