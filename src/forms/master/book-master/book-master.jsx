import  { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import axios from 'axios';

// Enum for Transaction Type (matching the DTO)
const TransactionType = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

// Custom hook for form management and validation
const useMasterController = (config) => {
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

const BookMasterForm = () => {
  const {
    handleCheckboxChange, 
    handleInputChange, 
    handleSubmit, 
    formData,
    errors,
    bookGroups,
    isLoading
  } = useMasterController({
    defaultValues: {
      name: '',
      uuid: '',
      code: '',
      openingBalance: 0,
      transcationType: '',
      accntCode: '',
      bookGroupMasterUuid: '',
      bookGroupMasterName: '',
      active: false
    },
    validationRules: {
      name: {
        required: 'Book name is required',
        validate: (value) => value && value.trim() !== '' || 'Book name cannot be blank'
      },
      code: {
        required: 'Book code is required',
        validate: (value) => value > 0 || 'Code must be a positive number'
      },
      openingBalance: {
        validate: (value) => value >= 0 || 'Opening balance cannot be negative'
      },
      transcationType: {
        required: 'Transaction type is required'
      },
      accntCode: {
        required: 'Account code is required',
        validate: (value) => value > 0 || 'Account code must be a positive number'
      },
      bookGroupMasterUuid: {
        required: 'Book group is required'
      }
    }
  });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Book Master</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Book Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Book Code
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

            {/* Book Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Book Name
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

            {/* Book Group Dropdown */}
            <div>
              <label htmlFor="bookGroupMasterUuid" className="block text-sm font-medium text-gray-700">
                Book Group
              </label>
              <select
                id="bookGroupMasterUuid"
                name="bookGroupMasterUuid"
                value={formData.bookGroupMasterUuid}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.bookGroupMasterUuid ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              >
                <option value="">
                  {isLoading ? 'Loading groups...' : 'Select Book Group'}
                </option>
                {bookGroups.map((group) => (
                  <option 
                    key={group.uuid} 
                    value={group.uuid}
                  >
                    {`${group.code} - ${group.name}`}
                  </option>
                ))}
              </select>
              {errors.bookGroupMasterUuid && (
                <p className="mt-1 text-xs text-red-500">{errors.bookGroupMasterUuid}</p>
              )}
            </div>

            {/* Account Code */}
            <div>
              <label htmlFor="accntCode" className="block text-sm font-medium text-gray-700">
                Account Code
              </label>
              <input
                id="accntCode"
                name="accntCode"
                type="number"
                value={formData.accntCode}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.accntCode ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.accntCode && (
                <p className="mt-1 text-xs text-red-500">{errors.accntCode}</p>
              )}
            </div>

            {/* Opening Balance */}
            <div>
              <label htmlFor="openingBalance" className="block text-sm font-medium text-gray-700">
                Opening Balance
              </label>
              <input
                id="openingBalance"
                name="openingBalance"
                type="number"
                step="0.01"
                value={formData.openingBalance}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.openingBalance ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              />
              {errors.openingBalance && (
                <p className="mt-1 text-xs text-red-500">{errors.openingBalance}</p>
              )}
            </div>

            {/* Transaction Type */}
            <div>
              <label htmlFor="transcationType" className="block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                id="transcationType"
                name="transcationType"
                value={formData.transcationType}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.transcationType ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              >
                <option value="">Select transaction type</option>
                <option value={TransactionType.CREDIT}>Credit</option>
                <option value={TransactionType.DEBIT}>Debit</option>
              </select>
              {errors.transcationType && (
                <p className="mt-1 text-xs text-red-500">{errors.transcationType}</p>
              )}
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center">
              <input
                id="active"
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookMasterForm;