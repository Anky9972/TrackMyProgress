import React, { useState } from "react";
import { db, auth } from "../../services/firebase"; // Import Firebase config
import { doc, setDoc } from "firebase/firestore"; // Firestore functions

const MeetForm = ({ events }) => {
  const [formData, setFormData] = useState({
    title: "",
    meetingURL: "",
    allDay: false,
    date: "",
    startTime: "",
    endTime: "",
    people: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prevData) => ({ ...prevData, allDay: !prevData.allDay }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser; // Get the current user
      if (user) {
        const meetData = {
          ...formData,
          userId: user.uid,
        };

        // Save data to the 'meets' collection under the user's UID
        const docRef = doc(db, "meets", `${user.uid}_${formData.title}`);
        await setDoc(docRef, meetData);
        console.log("Meeting saved successfully:", meetData);

        // Optionally, clear the form after submission
        setFormData({
          title: "",
          meetingURL: "",
          allDay: false,
          date: "",
          startTime: "",
          endTime: "",
          people: "",
        });
      } else {
        console.error("No user is logged in.");
      }
    } catch (error) {
      console.error("Error saving meeting:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <div className="w-full">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Add title"
            className="w-full rounded-lg border px-4 py-1"
            required
          />
        </div>

        <div className="w-full">
          <input
            type="text"
            name="meetingURL"
            value={formData.meetingURL}
            onChange={handleInputChange}
            placeholder="Add meeting URL"
            className="w-full rounded-lg border px-4 py-1"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-2 border rounded-lg">
          <div className="flex justify-between border-b p-2">
            <div>Date and time</div>
            <div className="flex gap-2 justify-center items-center">
              <span>All day</span>
              <button
                type="button"
                onClick={handleToggle}
                className={`w-10 h-5 rounded-full transition-colors duration-300 px-[2px] flex justify-start items-center ${
                  formData.allDay ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${
                    formData.allDay ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="w-full px-2 flex flex-col gap-2 pb-2">
            <div className="w-full flex justify-between">
              <div>On</div>
              <div className="w-4/5 flex justify-end items-center">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border px-5 rounded-md"
                  required
                />
              </div>
            </div>

            {!formData.allDay && (
              <>
                <div className="w-full flex justify-between">
                  <div>From</div>
                  <div className="w-[68%] flex justify-end items-center">
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="border px-5 rounded-md w-full"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex justify-between">
                  <div>To</div>
                  <div className="w-[68%] flex justify-end items-center">
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="border px-5 rounded-md w-full"
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full">
          <input
            type="text"
            name="people"
            value={formData.people}
            onChange={handleInputChange}
            placeholder="Add people"
            className="px-4 p-1 border rounded-lg w-full"
            required
          />
        </div>

        <div className="w-full flex justify-between">
          <button type="button" className="px-5 py-2">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black px-5 py-2 rounded-lg text-white"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetForm;
