import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Enum for Transaction Type
const TransactionType = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

const BookMasterForm = () => {
  const [formData, setFormData] = useState({
    bookGroupMasterUuid: '', // Book Group
    code: '', // Book Code
    name: '', // Book Name
    accntCode: '', // Account Code
    openingBalance: '', // Opening Balance
    transcationType: '', // Transaction Type
    active: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample book groups (replace with actual data source)
  const bookGroups = [
    { uuid: '1', code: 'BG001', name: 'Sales Book' },
    { uuid: '2', code: 'BG002', name: 'Purchase Book' },
    // Add more book groups
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    switch (name) {
      case 'name':
        processedValue = value.slice(0, 40);
        break;
      case 'code':
      case 'accntCode':
        processedValue = value.replace(/\D/g, '');
        break;
      case 'openingBalance':
        processedValue = value
          .replace(/[^0-9.]/g, '')
          .replace(/(\..*)\./g, '$1')
          .split('.')
          .map((part, index) => 
            index === 0 
              ? part.slice(0, 8)  // 8 digits before decimal 
              : part.slice(0, 2)  // 2 digits after decimal
          )
          .join('.');
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    
    if (!formData.bookGroupMasterUuid) {
      newErrors.bookGroupMasterUuid = 'Book Group is required';
    }
    
    if (!formData.code) {
      newErrors.code = 'Book Code is required';
    }
    
    if (!formData.name) {
      newErrors.name = 'Book Name is required';
    }

    setErrors(newErrors);
    
    // If no errors, proceed with submission
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted', formData);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Book Master
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse">
            <tbody>
              {/* First Row: Book Group and Book Code */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="bookGroupMasterUuid" className="block text-sm font-medium text-gray-700">
                    Book Group
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <select
                    id="bookGroupMasterUuid"
                    name="bookGroupMasterUuid"
                    value={formData.bookGroupMasterUuid}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm 
                      ${errors.bookGroupMasterUuid ? "border-red-500 focus:border-red-500" : "focus:border-indigo-300"}
                      focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  >
                    <option value="">Select Book Group</option>
                    {bookGroups.map((group) => (
                      <option key={group.uuid} value={group.uuid}>
                        {`${group.code} - ${group.name}`}
                      </option>
                    ))}
                  </select>
                  {errors.bookGroupMasterUuid && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.bookGroupMasterUuid}
                    </p>
                  )}
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Book Code
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    value={formData.code}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm 
                      ${errors.code ? "border-red-500 focus:border-red-500" : "focus:border-indigo-300"}
                      focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  />
                  {errors.code && (
                    <p className="mt-1 text-xs text-red-500">{errors.code}</p>
                  )}
                </td>
              </tr>

              {/* Book Name Row with Colspan */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Book Name 
                  </label>
                </td>
                <td colSpan={3} className="p-2 w-3/4">
                  <input
                    id="name"
                    name="name"
                    maxLength={40}
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm 
                      ${errors.name ? "border-red-500 focus:border-red-500" : "focus:border-indigo-300"}
                      focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </td>
              </tr>

              {/* Account Code and Opening Balance */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="accntCode" className="block text-sm font-medium text-gray-700">
                    Account Code
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="accntCode"
                    name="accntCode"
                    value={formData.accntCode}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="openingBalance" className="block text-sm font-medium text-gray-700">
                    Opening Balance
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="openingBalance"
                    name="openingBalance"
                    value={formData.openingBalance}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
              </tr>

              {/* Transaction Type */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="transcationType" className="block text-sm font-medium text-gray-700">
                    Transaction Type
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <select
                    id="transcationType"
                    name="transcationType"
                    value={formData.transcationType}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Select Transaction Type</option>
                    <option value={TransactionType.CREDIT}>Credit</option>
                    <option value={TransactionType.DEBIT}>Debit</option>
                  </select>
                </td>
                
              </tr>

              {/* Submit Button */}
              <tr>
                <td colSpan="4" className="p-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookMasterForm;