import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const useBookGroupMasterController = (config) => {
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
        const response = await fetch('http://localhost:8262/account/software/book/group/master', {
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

const BookGroupMasterForm = () => {
  const {
    handleInputChange, 
    handleSubmit, 
    formData,
    errors,
    isSubmitting
  } = useBookGroupMasterController({
    defaultValues: {
      code: '',
      name: '',
      mini: '',
      max: ''
    },
    validationRules: {
      code: {
        required: 'Book Group Code is required',
        validate: (value) => value > 0 || 'Code must be a positive number'
      },
      name: {
        required: 'Book Group Name is required',
        validate: (value) => value && value.trim() !== '' || 'Name cannot be blank'
      },
      mini: {
        required: 'Minimum value is required',
        validate: (value) => value > 0 || 'Minimum must be a positive number'
      },
      max: {
        required: 'Maximum value is required',
        validate: (value) => value > 0 || 'Maximum must be a positive number'
      }
    }
  });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Book Group Master</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Book Group Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Group Code
              </label>
              <input
                id="code"
                name="code"
                type="number"
                value={formData.code}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.code ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.code && (
                <p className="mt-1 text-xs text-red-500">{errors.code}</p>
              )}
            </div>

            {/* Book Group Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Group Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Minimum Value */}
            <div>
              <label htmlFor="mini" className="block text-sm font-medium text-gray-700">
                Minimum Value
              </label>
              <input
                id="mini"
                name="mini"
                type="number"
                value={formData.mini}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.mini ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.mini && (
                <p className="mt-1 text-xs text-red-500">{errors.mini}</p>
              )}
            </div>

            {/* Maximum Value */}
            <div>
              <label htmlFor="max" className="block text-sm font-medium text-gray-700">
                Maximum Value
              </label>
              <input
                id="max"
                name="max"
                type="number"
                value={formData.max}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.max ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.max && (
                <p className="mt-1 text-xs text-red-500">{errors.max}</p>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookGroupMasterForm;