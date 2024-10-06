import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase"; // Import Firebase config
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import event from "../../assets/event.jpg";
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Reference to the 'events' collection in Firestore
        const eventsCollectionRef = collection(db, "events");
        const querySnapshot = await getDocs(eventsCollectionRef); // Get all documents in the 'events' collection
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData); // Store the fetched events in state
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchEvents();
  }, []);

  // Display loading indicator while fetching data
  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="w-1/3 flex flex-col justify-center items-center p-4 shadow-md rounded-3xl bg-white">
      <h2>Events</h2>
      {events.length === 0 ? (
        <img src={event} alt="event image" className="w-4/5" />
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Time: {event.startTime} - {event.endTime}</p>
              <p>Description: {event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
