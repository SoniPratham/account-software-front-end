import axios from 'axios';
import  { useState, useEffect } from 'react';

// Custom hook for form management and validation
const BookMasterController = (config) => {
    const { defaultValues, validationRules } = config;
    const [formData, setFormData] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    const [bookGroups, setBookGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    // Fetch Book Groups
    useEffect(() => {
      const fetchBookGroups = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('http://localhost:8262/account/software/book/group/master/list', {
            params: {
              pageNumber: 1,
              pageSize: 100
            }
          });
  
          if (response.data && response.data.data) {
            setBookGroups(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching book groups:', error);
          // Optionally set an error state to show to the user
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchBookGroups();
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
      
      // Clear previous error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined
        }));
      }
    };
  
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    };
  
    const validateForm = () => {
      const newErrors = {};
  
      Object.keys(validationRules).forEach(key => {
        const rules = validationRules[key];
        const value = formData[key];
  
        if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
          newErrors[key] = rules.required === true 
            ? `${key.charAt(0).toUpperCase() + key.slice(1)} is required` 
            : rules.required;
        }
  
        if (rules.validate && typeof rules.validate === 'function') {
          const validationResult = rules.validate(value);
          if (typeof validationResult === 'string') {
            newErrors[key] = validationResult;
          }
        }
      });
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        // Proceed with form submission
        console.log('Form submitted', formData);
        // Add your submission logic here
      }
    };
  
    return {
      handleInputChange,
      handleCheckboxChange,
      handleSubmit,
      formData,
      errors,
      setFormData,
      bookGroups,
      isLoading
    };
  };

  export default BookMasterController;