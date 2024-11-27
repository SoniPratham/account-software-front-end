import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import MenubarController from './MenubarController';
import AccountMasterForm from '../../forms/account-master/account-master';

const MenuItem = ({ label, children, isTopLevel = false ,formComponent}) => {
  const {isOpen,setIsOpen} = MenubarController();

  return (
    <div className={`relative ${isTopLevel ? 'inline-block' : 'w-full'}`}>
      <button
        className={`flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 ${isTopLevel ? 'border-b-2 border-transparent hover:border-gray-300' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {children && (
          isOpen ? <ChevronDown size={16} className="ml-1" /> : <ChevronRight size={16} className="ml-1" />
        )}
      </button>
      {isOpen && children && (
        <div className={`bg-white border border-gray-200 shadow-lg ${isTopLevel ? 'absolute left-0 mt-2 rounded' : 'w-full'}`}>
          {children}
        </div>
      )}
      {isOpen && formComponent}
    </div>
  );
};

const MasterModule = () => {
  return (
    <div className="bg-white border border-gray-200 rounded shadow">
      <div className="flex">
        <MenuItem label="DataEntry" isTopLevel>
          <MenuItem label="Master Entry">
            <MenuItem label="Account Master" formComponent = {<AccountMasterForm/>} />
            <MenuItem label="Account Group Master" />
            <MenuItem label="Item Master" />
            <MenuItem label="Item Group Master" />
            <MenuItem label="Book Master" />
          </MenuItem>
          <MenuItem label="Transaction">
            <MenuItem label="Purchase" />
            <MenuItem label="Sales" />
            <MenuItem label="Bank & Cash Entry" />
            <MenuItem label="Journal Entry" />
          </MenuItem>
        </MenuItem>
        <MenuItem label="Reports" isTopLevel />
        <MenuItem label="Utilities" isTopLevel />
        <MenuItem label="Companies Menu" isTopLevel />
      </div>
    </div>
  );
};

export default MasterModule;
