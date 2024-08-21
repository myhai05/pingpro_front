import React, { useState } from 'react';
import UserList from './userList'; 
import OfferList from './offerList';
import Display from './display';
import './dashboard.css'; // Assurez-vous que le fichier CSS est à jour
import DisplayNotifications from './notificationsDisplay';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('user');

  return (
    <div className="dashboard">
      <div className="sidebar">
      <ul>
        <li>
          <button
            className={activeTab === 'user' ? 'active' : ''}
            onClick={() => setActiveTab('user')}
          >
            User
          </button>
        </li>
        <li>
          <button
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </li>
        <li>
          <button
            className={activeTab === 'offers' ? 'active' : ''}
            onClick={() => setActiveTab('offers')}
          >
            Offres
          </button>
        </li>
        <li>
          <button
            className={activeTab === 'display' ? 'active' : ''}
            onClick={() => setActiveTab('display')}
          >
            Posts
          </button>
        </li>
      </ul>
      </div>
      <div className="content">
        {activeTab === 'user' && <UserList />}
        {activeTab === 'notifications' && <DisplayNotifications />}
        {activeTab === 'offers' && <OfferList />}
        {activeTab === 'display' && <Display />}
      </div>
    </div>
  );
};

export default Dashboard;
