import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
const AddQuestion = ({setAddQuestion,addQuestion}) => {
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Save question");
  };
  return (
    <div className="w-1/2 bg-white fixed z-[6000] right-0 h-full top-0 border-l flex flex-col">
      <div className="w-full p-4 border-b flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <button onClick={()=>{setAddQuestion(!addQuestion)}}><IoIosCloseCircle className="text-2xl"/></button>
          <h1 className="font-semibold text-xl">Add Question</h1>
        </div>
        <div>
          <button className="px-4 py-1 rounded-lg bg-blue-500">Save</button>
        </div>
      </div>
      <div className="w-full p-4">
        <form onSubmit={handleSave}>
          <div className="w-full flex flex-col border-b-2 py-2">
            <div className="w-full flex justify-start">
              <h2 className="text-lg font-semibold">Question Details</h2>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <label className="font-semibold text-gray-700">Name:</label>
                <input type="text" placeholder="" className="border rounded-lg px-2 py-1 w-3/4"/>
              </div>
              <div className="w-full flex justify-between">
                <label className="font-semibold text-gray-700">Platform:</label>
                <input type="text" className="border rounded-lg px-2 py-1 w-3/4"/>
              </div>
              <div className="w-full flex justify-between">
                <label className="font-semibold text-gray-700">Difficulty:</label>
                <input type="text" className="border rounded-lg px-2 py-1 w-3/4" />
              </div>
              <div className="w-full flex justify-between">
                <label className="font-semibold text-gray-700">Topics:</label>
                <input type="text" className="border rounded-lg px-2 py-1 w-3/4"/>
              </div>
              <div className="w-full flex justify-between">
                <label className="font-semibold text-gray-700">Company:</label>
                <input type="text" className="border rounded-lg px-2 py-1 w-3/4"/>
              </div>
            </div>
          </div>
          <div className="w-full mt-2 border-b-2 py-2">
            <div className="w-full flex justify-start">
              <h2 className="text-lg font-semibold">Additional Details</h2>
            </div>
            <div className="w-full p-4 flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <label className="font-semibold text-gray-700">Tags:</label>
                <input type="text" placeholder="Add Custom Tags" className="border rounded-lg px-2 py-1 w-3/4"/>
              </div>
              <div className="w-full flex justify-between">
                <label className="font-semibold text-gray-700">Sheets:</label>
                <input type="text" placeholder="Add to sheet" className="border rounded-lg px-2 py-1 w-3/4"/>
              </div>
            </div>
          </div>
          <div className="w-full mt-2 py-2">
            <div className="w-full">
                <h2 className="text-lg font-semibold">Notes</h2>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
// companies;
// difficulty;
// tags;
// title;
// topics;
