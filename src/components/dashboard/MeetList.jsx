// import React from "react";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { LuClock9 } from "react-icons/lu";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { MdOutlineArrowForward } from "react-icons/md";

// const MeetList = () => {
//   return (
//     <div>
//       <div className="w-[280px] h-64 bg-white rounded-3xl flex flex-col gap-2 justify-between items-center mt-10 p-4 shadow-md">
//         <div className="w-full flex justify-between items-center border-b pb-2">
//           <div className="flex flex-col w-14 h-14 rounded-2xl border overflow-hidden">
//             <span className="h-1/3 bg-red-500 flex justify-center items-center text-white">
//               Oct
//             </span>
//             <span className="h-4/5 flex justify-center items-center text-2xl font-semibold">
//               04
//             </span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-semibold text-gray-500">
//               Live Event
//             </span>
//             <div className="font-semibold flex justify-center items-center gap-2">
//               <div className="w-2 h-2 rounded-full bg-red-500"></div>Meeting
//               with all
//             </div>
//           </div>
//           <div>
//             <HiOutlineDotsVertical />
//           </div>
//         </div>
//         <div className="flex flex-col gap-2 w-full">
//           <div className="flex gap-10 w-full justify-center items-center ">
//             <div className="flex flex-col">
//               <span className="text-4xl font-bold">8:45</span>
//               <span className="text-lg font-semibold text-gray-600">AM</span>
//             </div>
//             <span><MdKeyboardArrowRight/></span>
//             <div className="flex flex-col">
//               <span className="text-4xl font-bold">9:45</span>
//               <span className="text-lg font-semibold text-gray-600">AM</span>
//             </div>
//           </div>
//           <div className="w-full flex justify-center">
//             <span>profile</span>
//             <span>profile</span>
//             <span>profile</span>
//           </div>
//         </div>
//         <div className="w-full ">
//           <button className="w-full rounded-lg py-1 border text-gray-700 font-medium text-lg">
//             Go to meeting
//           </button>
//         </div>
//       </div>
//       <div className="w-[300px] h-36 flex flex-col justify-between bg-white rounded-3xl p-4 mt-10 shadow-md">
//         <div className="flex justify-between">
//             <div className="flex justify-center items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
//                 <div className="text-xl font-semibold">Meeting with all</div>
//             </div>
//             <div><HiOutlineDotsVertical className="text-xl"/></div>
//         </div>
//         <div className="flex justify-start items-center gap-2 text-lg font-semibold text-gray-500" >
//             <div><LuClock9/></div>
//             <div>Today at:</div>
//             <div className="flex items-center gap-2">10:00 <span><MdOutlineArrowForward/></span> 11:00</div>
//         </div>
//         <div className="mt-5">
//             <button className="w-full bg-black rounded-lg py-1 border text-white font-medium text-lg">Go to meeting</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetList;
import React, { useEffect, useState } from "react";
import { db, auth } from "../../services/firebase"; // Import Firebase config
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore functions
import meeting from '../../assets/meeting.jpg';
const MeetList = () => {
  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeets = async () => {
      setLoading(true);
      const user = auth.currentUser; // Get the current user
      if (user) {
        const meetsCollectionRef = collection(db, "meets");
        const q = query(meetsCollectionRef, where("userId", "==", user.uid));
        
        try {
          const querySnapshot = await getDocs(q);
          const meetsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setMeets(meetsData);
        } catch (error) {
          console.error("Error fetching meetings:", error);
        }
      }
      setLoading(false);
    };

    fetchMeets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/3 flex flex-col justify-center items-center p-4 shadow-md rounded-3xl bg-white">
      <h2>Meetings</h2>
      {meets.length === 0 ? (
        <img src={meeting} alt="error" className="w-4/5"/>
      ) : (
        <ul>
          {meets.map((meet) => (
            <li key={meet.id}>
              <h3>{meet.title}</h3>
              <p>URL: {meet.meetingURL}</p>
              <p>Date: {meet.date}</p>
              <p>Time: {meet.startTime} - {meet.endTime}</p>
              <p>Participants: {meet.people}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetList;
