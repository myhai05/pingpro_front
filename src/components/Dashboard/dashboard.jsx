import React, { useState } from 'react';
import UserList from './userList'; 
import OfferList from './offerList';
import Display from './display';
import NotificationList from './notifications';
import './dashboard.css'; // Assurez-vous que le fichier CSS est à jour
import DisplayNotifications from './notificationsDisplay';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('user');

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li
            className={activeTab === 'user' ? 'active' : ''}
            onClick={() => setActiveTab('user')}
          >
            User
          </li>
          <li
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </li>
          <li
            className={activeTab === 'offers' ? 'active' : ''}
            onClick={() => setActiveTab('offers')}
          >
            Offres
            </li>
          <li
            className={activeTab === 'display' ? 'active' : ''}
            onClick={() => setActiveTab('display')}
          >
            Posts
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
