import { useState } from "react";
const MenubarController = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return{
    isOpen,
    setIsOpen,
  }
}

export default MenubarController; 