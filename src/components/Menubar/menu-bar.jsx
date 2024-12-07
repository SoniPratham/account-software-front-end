import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ label, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const submenuRef = useRef(null);

  const handleClick = () => {
    if (children) {
      setIsExpanded(!isExpanded);
    } else {
      // Close all other submenus
      const parentMenu = document.querySelector(".master-menu");
      if (parentMenu) {
        parentMenu.querySelectorAll(".submenu").forEach((submenu) => {
          submenu.classList.remove("block");
          submenu.classList.add("hidden");
        });
      }
      
      switch(label) {
        case "Account Master":
          navigate("/account-master");
          break;
        case "Account Group Master":
          navigate("/account-group-master");
          break;
        case "Item Master":
          navigate("/item-master");
          break;
        case "Item Group Master":
          navigate("/item-group-master");
          break;
        case "Book Master":
          navigate("/book-master");
          break;
        case "Purchase":
          navigate("/purchase-entry");
          break;
        case "Sales":
          navigate("/sales-entry");
          break;
        case "Bank & Cash Entry":
          navigate("/bank-cash-entry");
          break;
        case "Journal Entry":
          navigate("/journal-entry");
          break;
        case "Reports":
          navigate("/reports");
          break;
        case "Utilities":
          navigate("/utilities");
          break;
        case "Companies Menu":
          navigate("/companies-menu");
          break;
        default:
          break;
      }
    }
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={submenuRef}>
      <div
        className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
        onClick={handleClick}
      >
        <span>{label}</span>
        {children && <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>}
      </div>
      {children && (
        <div
          className={`${
            isExpanded ? "block" : "hidden"
          } absolute left-full top-3 z-50  w-48 bg-white border border-gray-200 rounded shadow-lg submenu`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const MenuBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-md z-40 master-menu">
      <div className="flex flex-row items-center h-12">
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

        <MenuItem label="Reports" />
        <MenuItem label="Utilities" />
        <MenuItem label="Companies Menu" />
      </div>
    </div>
  );
};

export default MenuBar;