import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../services/firebase'; // Ensure Firestore is initialized correctly
import { auth } from '../../services/firebase'; // Import Firebase Auth

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    assignee: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Get the currently authenticated user

    if (!user) {
      alert("You must be logged in to create a task.");
      return;
    }

    try {
      // Add the userId to the task data
      const taskWithUserId = {
        ...taskData,
        userId: user.uid, // Add the userId field
      };

      // Add the task to Firestore
      await addDoc(collection(db, "tasks"), taskWithUserId);
      alert("Task added successfully!");

      // Clear form after submission
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        assignee: '',
        status: 'Pending',
      });
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Failed to add task.");
    }
  };

  return (
    <div className="bg-white w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <div className="mb-2">
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
            placeholder="Enter task title"
            required
          />
        </div>

        {/* Task Description */}
        <div className="mb-2">
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter task description"
            rows="3"
          ></textarea>
        </div>

        {/* Due Date and Assignee */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Assignee</label>
            <input
              type="text"
              name="assignee"
              value={taskData.assignee}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md"
              placeholder="Assign to (e.g., John Doe)"
            />
          </div>
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <button
            type="button"
            className="text-black px-6 py-2 rounded-md"
            onClick={() => setTaskData({ title: '', description: '', dueDate: '', priority: 'Medium', assignee: '', status: 'Pending' })}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
