import { useState } from 'react';

const AccountGroupMasterController = (config) => {
    const { defaultValues, validationRules } = config;
    const [formData, setFormData] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear previous error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined
        }));
      }
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        setIsSubmitting(true);
        try {
          const response = await fetch('http://localhost:8262/account/software/account/group/master', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
  
          if (!response.ok) {
            throw new Error('Submission failed');
          }
  
          const responseData = await response.json();
          console.log('Submission successful:', responseData);
          // Optional: reset form or show success message
          setFormData(defaultValues);
        } catch (error) {
          console.error('Submission error:', error);
          // Optional: handle error (show error message, etc.)
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  
    return {
      handleInputChange,
      handleSubmit,
      formData,
      errors,
      isSubmitting
    };
  };

  export default AccountGroupMasterController;