import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const MenuItem = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {children && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </button>
      {isOpen && children && (
        <div className="pl-4 mt-1 border-l border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

const MasterModule = () => {
  return (
    <div className="w-64 bg-white border border-gray-200 rounded shadow">
      <MenuItem label="DataEntry">
        <MenuItem label="Master Entry">
          <MenuItem label="Account Master" />
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
      <MenuItem label="Reports" />
      <MenuItem label="Utilities" />
      <MenuItem label="Companies Menu" />
    </div>
  );
};

export default MasterModule;