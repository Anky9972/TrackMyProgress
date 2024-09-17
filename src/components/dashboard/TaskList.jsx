
const tasks = [
  { id: 1, name: 'Complete project documentation', completed: false },
  { id: 2, name: 'Submit code review', completed: true },
  { id: 3, name: 'Fix bugs in the event tracker', completed: false },
];

const TaskList = () => {
  return (
    <div>
      <ul className="list-disc pl-5">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <span
              className={`${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
