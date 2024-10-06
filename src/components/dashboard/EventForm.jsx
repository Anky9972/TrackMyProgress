import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const EventForm = ({ onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "Conference",
    eventURL: "",
    recurrence: "None",
    userId: "", // Include userId in the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get Firestore and Auth instances
    const db = getFirestore();
    const auth = getAuth();
    
    const user = auth.currentUser; // Get the currently authenticated user

    if (!user) {
      alert("You must be logged in to create a task.");
      return;
    }

    try {
      // Add event data to the events collection
      // Add the userId to the task data
      const eventWithUserId = {
        ...eventData,
        userId: user.uid, // Add the userId field
      };
      await addDoc(collection(db, "events"), eventWithUserId);
      // Call the onSubmit prop if you want to do something else after adding the event
      onSubmit(eventData);
      
      // Optionally, reset the form after successful submission
      setEventData({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        category: "Conference",
        eventURL: "",
        recurrence: "None",
        userId: "", // Reset userId
      });
    } catch (error) {
      console.error("Error adding event: ", error);
      // Handle any errors here, e.g., display a notification to the user
    }
  };

  return (
    <div className="bg-white w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Event Title */}
        <div className="mb-2">
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Event Description */}
        <div className="mb-2">
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter event description"
            rows="3"
          ></textarea>
        </div>

        {/* Date and Time */}
        <div className="flex flex-col border rounded-lg p-2 mb-2 gap-2">
          <div className="flex justify-between items-center">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-3/5 px-3 py-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleChange}
              className="w-3/5 px-3 py-1 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleChange}
              className="w-3/5 px-3 py-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Event Category */}
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Event Category
          </label>
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Meetup">Meetup</option>
            <option value="Webinar">Webinar</option>
          </select>
        </div>

        {/* Recurrence and Event URL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Recurrence
            </label>
            <select
              name="recurrence"
              value={eventData.recurrence}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="None">None</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Event URL
            </label>
            <input
              type="url"
              name="eventURL"
              value={eventData.eventURL}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md"
              placeholder="Enter event URL"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <button
            type="button"
            className="text-black px-6 py-2 rounded-md"
            onClick={() => setEventData({ title: "", description: "", date: "", startTime: "", endTime: "", location: "", category: "Conference", eventURL: "", recurrence: "None", userId: "" })}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
