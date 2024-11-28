import React from 'react';
import { Link } from 'react-router-dom';

const MasterEntry = () => {
  return (
    <div>
      <h2>Master Entry</h2>
      <ul>
        <li><Link to="/master-entry/account-master">Account Master</Link></li>
        <li><Link to="/master-entry/account-group-master">Account Group Master</Link></li>
        <li><Link to="/master-entry/item-master">Item Master</Link></li>
        {/* Add more submenu items here */}
      </ul>
    </div>
  );
};

export default MasterEntry;