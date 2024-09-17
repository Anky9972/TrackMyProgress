import { useState } from 'react';
import AccountSettings from '../components/settings/AccountSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import LanguageSettings from '../components/settings/LanguageSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import SupportSettings from '../components/settings/SupportSettings';
import AboutSettings from '../components/settings/AboutSettings';
import {GoArrowLeft} from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
export default function Settings() {
  const [activeSetting, setActiveSetting] = useState('profile');
  const navigate = useNavigate();
  const settings = [
    { id: 'profile', name: 'Profile Settings' },
    { id: 'account', name: 'Account Settings' },
    { id: 'appearance', name: 'Theme & Appearance' },
    { id: 'integrations', name: 'Integration Settings' },
    { id: 'security', name: 'Security & Privacy' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'language', name: 'Language & Region' },
    { id: 'support', name: 'Help & Support' },
    { id: 'about', name: 'About' },
  ];

  const renderSettingDetail = () => {
    switch (activeSetting) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'language':
        return <LanguageSettings />;
      case 'support':
        return <SupportSettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-10 justify-center gap-5">
      {/* Left Panel */}
      <div className="w-1/5 bg-white shadow-lg p-4 rounded-lg">
      
        <h2 className="text-xl mb-4 flex items-center gap-5"><button className='p-2 rounded-full hover:bg-gray-100 duration-200 transition-all'  onClick={()=>{navigate('/dashboard')}}><GoArrowLeft/></button><span className='font-bold'>Settings</span></h2>
        <ul className="space-y-2">
          {settings.map((setting) => (
            <li
              key={setting.id}
              className={`p-2 cursor-pointer rounded-md ${
                activeSetting === setting.id ? 'bg-gray-100' : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveSetting(setting.id)}
            >
              {setting.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="w-3/4 bg-white shadow-lg p-8 rounded-lg">
        {renderSettingDetail()}
      </div>
    </div>
  );
}
