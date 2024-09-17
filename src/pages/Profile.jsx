import { useEffect, useState } from "react";
import { auth } from "../services/firebase"; // Import your Firebase auth service
import { updateProfile } from "firebase/auth";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
  });

  useEffect(() => {
    // Fetch user information after login
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName,
        avatar: currentUser.photoURL || 'https://via.placeholder.com/150',
        email: currentUser.email,
      });
      setFormData({
        name: currentUser.displayName || '',
        bio: '', // You may store this in a Firestore document, etc.
        location: '', // Same as bio
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setEditing((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        photoURL: user.avatar, // Update photo URL if you allow photo upload
      });
      setUser((prev) => ({ ...prev, name: formData.name }));
      // Save bio and location to Firestore or another database if needed
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!user) {
    return <div className="w-full min-h-screen flex justify-center items-center">
              <div className="w-12 h-12 rounded-full border-4 border-black"></div>
    </div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen w-full p-8 flex justify-center gap-5">
      <div className="w-1/5 bg-white rounded-md shadow-md p-5">
      <div className="flex items-center space-y-2 flex-col justify-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-lg"
          />
          <div className="flex flex-col justify-center items-center">
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-xl font-bold text-gray-800 bg-transparent border-b border-gray-400"
              />
            ) : (
              <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
            )}
            <p className="text-gray-600">{user.email}</p>
            {editing ? (
              <>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Add a short bio..."
                  className="text-gray-500 bg-transparent border-b border-gray-400"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Your location"
                  className="text-gray-500 bg-transparent border-b border-gray-400"
                />
              </>
            ) : (
              <>
                <p className="text-gray-500">{formData.bio}</p>
                <p className="text-gray-500">{formData.location}</p>
              </>
            )}
          </div>
        </div>
        <div className="w-full mt-5">
        {editing ? (
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleEditToggle}
          >
            Edit Profile
          </button>
        )}
        </div>
      </div>
      <div className="w-3/5  bg-white p-6 rounded-lg shadow-md">
        {/* Profile Header
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-lg"
          />
          <div>
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-3xl font-bold text-gray-800 bg-transparent border-b border-gray-400"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            )}
            <p className="text-gray-600">{user.email}</p>
            {editing ? (
              <>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Add a short bio..."
                  className="text-gray-500 bg-transparent border-b border-gray-400"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Your location"
                  className="text-gray-500 bg-transparent border-b border-gray-400"
                />
              </>
            ) : (
              <>
                <p className="text-gray-500">{formData.bio}</p>
                <p className="text-gray-500">{formData.location}</p>
              </>
            )}
          </div>
        </div>

        {editing ? (
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleEditToggle}
          >
            Edit Profile
          </button>
        )} */}

        {/* Coding Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-blue-600">150</h2>
            <p className="text-gray-600">Problems Solved</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-600">45</h2>
            <p className="text-gray-600">Day Streak</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-yellow-600">#1200</h2>
            <p className="text-gray-600">Global Rank</p>
          </div>
        </div>

        {/* Favorite Coding Sheets */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Favorite Coding Sheets
          </h2>
          <ul className="space-y-4">
            <li className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">
                Dynamic Programming
              </h3>
              <p className="text-gray-600">
                Challenges focusing on dynamic programming techniques.
              </p>
            </li>
            <li className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">
                Data Structures
              </h3>
              <p className="text-gray-600">
                Problems related to various data structures.
              </p>
            </li>
            <li className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">
                Algorithms
              </h3>
              <p className="text-gray-600">
                Solve algorithmic challenges to sharpen your skills.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
