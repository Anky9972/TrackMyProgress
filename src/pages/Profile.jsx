import { useEffect, useState } from "react";
import { auth } from "../services/firebase"; // Import your Firebase auth service
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { PiGraduationCapLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { PiGithubLogoLight } from "react-icons/pi";
import SignIn from "./Signin";

const ProfileSection = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user information after login
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName,
        avatar: currentUser.photoURL || "https://via.placeholder.com/150",
        email: currentUser.email,
      });
      setFormData({
        name: currentUser.displayName || "",
        bio: "", // You may store this in a Firestore document, etc.
        location: "", // Same as bio
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
    // return <div className="w-full min-h-screen flex justify-center items-center">
    //           <div className="w-12 h-12 rounded-full border-4 border-black"></div>
    // </div>;
    // navigate("/login");
    return <SignIn />;
  }

  return (
    <div className="bg-gray-100 min-h-screen w-full p-8 flex justify-center gap-5">
      <div className="w-1/5 bg-white rounded-lg shadow-md p-4 mt-16">
        <div className="flex items-center justify-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-16 h-16 rounded-full shadow-lg"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="w-full mt-5">
          <button
            className="w-full py-2 bg-green-100 text-green-700 font-semibold rounded-md"
            onClick={() => {
              navigate("/edit-profile");
            }}
          >
            Edit Profile
          </button>
        </div>
        <div className="w-full py-5 flex flex-col gap-2 border-b">
          <div className="w-full flex justify-start items-center gap-10">
            <span>
              <CiLocationOn className="text-xl opacity-65" />
            </span>
            <span>Location</span>
          </div>
          <div className="w-full flex justify-start items-center gap-10">
            <span>
              <PiGraduationCapLight className="text-xl opacity-65" />
            </span>
            <span>Education</span>
          </div>
          <div className="w-full flex justify-start items-center gap-10">
            <span>
              <CiMail className="text-xl opacity-65" />
            </span>
            <span>Email</span>
          </div>
          <div className="w-full flex justify-start items-center gap-10">
            <span>
              <CiLinkedin className="text-xl opacity-65" />
            </span>
            <span>linkedin</span>
          </div>
          <div className="w-full flex justify-start items-center gap-10">
            <span>
              <FaXTwitter className="text-xl opacity-65" />
            </span>
            <span>twitter</span>
          </div>
          <div className="w-full flex justify-start items-center gap-10">
            <span>
              <CiGlobe className="text-xl opacity-65" />
            </span>
            <span>web</span>
          </div>
          <div className="w-full flex justify-start items-center gap-10">
            <span>
              <PiGithubLogoLight className="text-xl opacity-65" />
            </span>
            <span>github</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 py-4">
          <div className="w-full px-4 py-2 bg-gray-100 rounded-md border">
            <button>Overall stats</button>
          </div><div className="w-full px-4 py-2 bg-gray-100 rounded-md border">
            <button>Platform wise stats</button>
          </div>
        </div>
        <div>
          <label htmlFor="visibilty">Visibilty</label>
          <select name="#" id="visibility">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="private">Custom</option>
          </select>
        </div>
      </div>

      <div className="w-3/5  bg-white p-6 rounded-lg shadow-md mt-16">

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
