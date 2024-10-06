import { useState, useRef, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MeetList from "./MeetList";
import AddTaskModal from "./AddTaskModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpcomingEvent from "./UpcomingEvent";
import EventForm from "./EventForm";
import TaskForm from "./TaskForm";
import MeetForm from "./MeetForm";
import TaskList from "./TaskList";
import EventList from "./EventList";
import TestAPIComponent from "./Test";

const localizer = momentLocalizer(moment);

const EventTracker = () => {
  const [activeTab, setActiveTab] = useState("Event");
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  
  const navItems = ["Event", "Task", "Meet"];
  const activeIndex = navItems.indexOf(activeTab);
  const [sliderStyle, setSliderStyle] = useState({});
  const navRef = useRef(null);  // Reference to the navigation

  const eventss = [
    {
      title: "React Conference 2024",
      date: "2024-11-10",
      description: "Join developers from around the world to discuss the latest in React development and front-end frameworks."
    },{
      title: "React Conference 2024",
      date: "2024-11-10",
      description: "Join developers from around the world to discuss the latest in React development and front-end frameworks."
    },{
      title: "React Conference 2024",
      date: "2024-11-10",
      description: "Join developers from around the world to discuss the latest in React development and front-end frameworks."
    },{
      title: "React Conference 2024",
      date: "2024-11-10",
      description: "Join developers from around the world to discuss the latest in React development and front-end frameworks."
    },
    // Add more events here...
  ];

  const addNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  };

  const addNewMeeting = (newMeeting) => {
    setMeetings([...meetings, newMeeting]);
    toast.success("Meeting added successfully!");
  };

  const addNewEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    toast.success("Event added successfully!");
  };

  // Update slider position on tab change
  useEffect(() => {
    const updateSliderPosition = () => {
      const nav = navRef.current;
      if (nav) {
        const liElements = nav.querySelectorAll("li");
        if (liElements[activeIndex]) {
          const li = liElements[activeIndex];
          setSliderStyle({
            width: `${li.offsetWidth}px`,
            height: `${li.offsetHeight}px`,
            left: `${li.offsetLeft}px`,
            top: `${li.offsetTop}px`
          });
        }
      }
    };

    updateSliderPosition();
    window.addEventListener("resize", updateSliderPosition);  // Recalculate on resize

    return () => {
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-28 w-full">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Event Tracker
      </h1>

      <div className="flex w-full gap-5">
        {/* Sidebar Section */}
        <div className="w-1/4 bg-white rounded-3xl shadow-md p-4">
          <div className="relative flex mb-5 rounded-lg overflow-hidden">
            <nav className="bg-gray-200 px-2 py-1 w-full" ref={navRef}>
              <ul className="flex justify-around items-center relative">
                {navItems.map((item, index) => (
                  <li
                    key={item}
                    className={`cursor-pointer px-6 transition-all duration-300 relative z-10 ${
                      activeTab === item ? "text-black font-bold" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(item)}
                  >
                    {item}
                  </li>
                ))}

                {/* Sliding white div */}
                <div
                  className="absolute bg-white rounded-md transition-all duration-300 z-0"
                  style={sliderStyle}  // Apply dynamic styles for width, height, and position
                />
              </ul>
            </nav>
          </div>

          {/* Conditional Rendering of Lists */}
          {activeTab === "Event" && <EventForm />}
          {activeTab === "Task" && <TaskForm tasks={tasks} />}
          {activeTab === "Meet" && <MeetForm meetings={meetings} />}
        </div>

        {/* Upcoming Events Section */}
        <div className="w-1/4">
          <UpcomingEvent events={eventss} />
        </div>

        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-3xl shadow-md col-span-2">
          <Calendar
            localizer={localizer}
            events={[...tasks, ...meetings, ...events]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectSlot={(slotInfo) => {
              setShowModal(true);
            }}
            selectable
          />
        </div>
      </div>

      {/* Modal for Adding Events */}
      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          addTask={addNewTask}
          addMeeting={addNewMeeting}
          addEvent={addNewEvent}
        />
      )}
      <div className="w-full min-h-[80v] flex justify-center gap-10 mt-5">
      <MeetList/>
      <TaskList/>
      <EventList/>
      </div>
    </div>
  );
};

export default EventTracker;
