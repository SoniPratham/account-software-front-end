import { useState } from 'react';
const MasterController = () => {
    const [formData, setFormData] = useState({
        id: '',
        code: '',
        name: '',
        uuid: '',
        accountGroupMasterUuid: '',
        accountGroupMasterName: '',
        gstNo: '',
        stateUuid: '',
        stateName: '',
        city: '',
        address: '',
        openingBalance: '',
        transactionType: '',
        brokerMasterUuid: '',
        brokerMasterName: '',
        active: true
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: checked
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

      };
    
  return {
    formData,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit
  }
  
}

export default MasterController;