import React, { useState } from 'react';
import MyWorkspace from './MyWorkspace';

const SheetHome = () => {
  const [activeTab, setActiveTab] = useState('My Workspace'); // Manage active tab

  // Array of tab items
  const tabs = ['My Workspace', 'Explore Sheets', 'My Sheets', 'Notes', 'Analysis'];

  // Function to render content based on the selected tab
  const renderContent = () => {
    switch (activeTab) {
      case 'My Workspace':
        return <MyWorkspace/>;
      case 'Explore Sheets':
        return <div>Content for Explore Sheets</div>;
      case 'My Sheets':
        return <div>Content for My Sheets</div>;
      case 'Notes':
        return <div>Content for Notes</div>;
      case 'Analysis':
        return <div>Content for Analysis</div>;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <section className='w-full min-h-screen flex bg-gray-100'>
      {/* Left Navigation Panel */}
      <div className='w-1/5 min-h-screen border-r border-t bg-white shadow-md'>
        <nav className='flex flex-col p-4 space-y-2 mt-16'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`cursor-pointer px-3 py-2 text-lg ${
                activeTab === tab ? 'bg-gray-200 text-black font-bold' : 'text-black hover:bg-gray-100'
              } rounded-md transition-all duration-200`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </nav>
      </div>

      {/* Right Content Area */}
      <div className='w-4/5 min-h-screen p-6 bg-white border-t mt-16'>
        <h2 className='text-2xl font-bold mb-4'>{activeTab}</h2>
        <div>{renderContent()}</div>
      </div>
    </section>
  );
};

export default SheetHome;
