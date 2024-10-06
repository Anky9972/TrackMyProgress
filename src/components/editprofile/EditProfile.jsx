import React, { useState } from 'react';
import Tabs from './Tabs';
import BasicInfo from './BasicInfo';
import Socials from './Socials';
import Platforms from './Platforms';
import Visibility from './Visibility';
import Accounts from './Accounts';

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState('Basic Info');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Basic Info':
        return <BasicInfo />;
      case 'Socials':
        return <Socials />;
      case 'Platforms':
        return <Platforms />;
      case 'Visibility':
        return <Visibility />;
      case 'Accounts':
        return <Accounts />;
      default:
        return <BasicInfo />;
    }
  };

  return (
    <section className="flex justify-center items-start w-full min-h-screen gap-5 bg-gray-100">
      <div className='w-full flex justify-center gap-5 mt-24 pb-6'>
        {/* Left Panel */}
        <div className="w-1/6 bg-white p-4 rounded-lg border flex-shrink-0">
          <h2 className="text-lg font-bold">Profile</h2>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Right Panel */}
        <div className="w-3/5 bg-white border rounded-lg ">
          <div className="p-4 h-full">{renderActiveTab()}</div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
