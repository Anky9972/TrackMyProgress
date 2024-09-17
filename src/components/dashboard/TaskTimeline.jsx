import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaCheckCircle } from 'react-icons/fa';

const TaskTimeline = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        date="Today"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<FaCheckCircle />}
      >
        <h3 className="vertical-timeline-element-title">Complete Documentation</h3>
        <h4 className="vertical-timeline-element-subtitle">2 hours</h4>
        <p>Work on the documentation for the event tracker.</p>
      </VerticalTimelineElement>
      {/* Add more VerticalTimelineElement as needed */}
    </VerticalTimeline>
  );
};

export default TaskTimeline;

