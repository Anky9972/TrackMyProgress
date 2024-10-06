import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Basic Info', 'Socials', 'Platforms', 'Visibility', 'Accounts'];

  return (
    <div className='px-2 py-4'>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`block w-full text-left py-2 px-4 rounded hover:bg-gray-300 ${
            activeTab === tab ? 'bg-gray-100 text-black font-semibold border' : 'text-gray-600 font-semibold'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
