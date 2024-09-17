import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Calendar styles
import TaskList from './TaskList'; // Custom component for today's tasks
import TaskProgress from './TaskProgress'; // Custom component for task progress
import TaskTimeline from './TaskTimeline'; // Custom component for task timeline

const EventTracker = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Event Tracker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calendar</h2>
          <Calendar />
        </div>

        {/* Today's Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Today&apos;s Tasks</h2>
          <TaskList />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Task Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task Progress</h2>
          <TaskProgress />
        </div>

        {/* Task Timeline Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task Timeline</h2>
          <TaskTimeline />
        </div>
      </div>
    </div>
  );
};

export default EventTracker;
