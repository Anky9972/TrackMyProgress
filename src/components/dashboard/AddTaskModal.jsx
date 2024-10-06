import { useState } from 'react';

const AddTaskModal = ({ onClose, addTask, addMeeting, addEvent }) => {
  const [type, setType] = useState('task'); // task, meeting, event
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState(new Date());

  const handleAdd = () => {
    const newItem = { title, description, date, participants };
    if (type === 'task') addTask(newItem);
    if (type === 'meeting') addMeeting(newItem);
    if (type === 'event') addEvent(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New {type}</h2>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        >
          <option value="task">Task</option>
          <option value="meeting">Meeting</option>
          <option value="event">Event</option>
        </select>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        ></textarea>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleAdd}>
          Add {type}
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-4" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
