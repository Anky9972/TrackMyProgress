import { Line } from 'react-chartjs-2';

const TaskProgress = () => {
  const data = {
    labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
    datasets: [
      {
        label: 'Task Completion',
        data: [70, 80, 90, 100],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Progress Over Time',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TaskProgress;
