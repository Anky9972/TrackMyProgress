
const RecentActivity = () => {
  const activities = [
    { id: 1, description: 'Solved "Two Sum" on LeetCode', date: '2024-08-20' },
    { id: 2, description: 'Completed "Array Manipulation" on HackerRank', date: '2024-08-18' },
    { id: 3, description: 'Started "Dynamic Programming" course on Coursera', date: '2024-08-15' },
    // Add more activities as needed
  ];

  return (
    <div>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-700">{activity.description}</p>
            <p className="text-gray-500 text-sm">{activity.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
