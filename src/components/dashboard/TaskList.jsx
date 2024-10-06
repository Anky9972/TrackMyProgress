import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase'; // Firebase initialization
import { auth } from '../../services/firebase'; // Import auth to access current user
import task from '../../assets/task.jpg';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const user = auth.currentUser; // Get the current authenticated user

      if (user) {
        try {
          // Create a query to fetch tasks for the authenticated user
          const tasksCollectionRef = collection(db, 'tasks');
          const q = query(tasksCollectionRef, where('userId', '==', user.uid));

          const querySnapshot = await getDocs(q);
          const tasksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(tasksData);
        } catch (error) {
          console.error('Error fetching tasks: ', error);
        }
      } else {
        console.error('No user is logged in.');
      }

      setLoading(false);
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className='w-1/3 flex flex-col justify-center items-center p-4 shadow-md rounded-3xl bg-white'>
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <p>Estimated Time: {task.estimatedTime} hours</p>
            </li>
          ))}
        </ul>
      ) : (
        <img src={task} alt="task image" className='w-4/5' />
      )}
    </div>
  );
};

export default TaskList;
