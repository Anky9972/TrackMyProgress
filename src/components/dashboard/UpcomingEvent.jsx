// UpcomingEvent.jsx
import React from 'react';
import PropTypes from 'prop-types';

const UpcomingEvent = ({ events }) => {
  return (
    <div className="w-full bg-white p-4 rounded-3xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="border-b pb-4">
              <h3 className="text-md font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-sm text-gray-800">{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

UpcomingEvent.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default UpcomingEvent;
