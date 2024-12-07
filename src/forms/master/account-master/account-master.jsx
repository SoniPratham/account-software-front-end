import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AccountMasterForm = () => {
  const [formData, setFormData] = useState({
    accountGroupMasterUuid: '', // Account Group
    code: '', // Numeric code
    name: '', // Name (40 characters)
    addressLine1: '', // Address Line 1 (35 characters)
    addressLine2: '', // Address Line 2 (35 characters)
    gstNo: '', // GST No (15 characters)
    city: '', // City (15 characters)
    state: '', // State
    openingBalance: '', // Opening Balance (10,2)
    mobileNo: '', // Mobile No (25 characters, digits and comma)
    active: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample account groups (replace with actual data source)
  const accountGroups = [
    { uuid: '1', code: 'AG001', name: 'Creditors' },
    { uuid: '2', code: 'AG002', name: 'Debtors' },
    // Add more account groups
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    switch (name) {
      case 'name':
        processedValue = value.slice(0, 40);
        break;
      case 'addressLine1':
      case 'addressLine2':
        processedValue = value.slice(0, 35);
        break;
      case 'gstNo':
        processedValue = value.slice(0, 24);
        break;
      case 'city':
        processedValue = value.slice(0, 15);
        break;
      case 'code':
        processedValue = value.replace(/\D/g, '');
        break;
      case 'mobileNo':
        processedValue = value.replace(/[^0-9,]/g, '').slice(0, 25);
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
    
    if (!formData.accountGroupMasterUuid) {
      newErrors.accountGroupMasterUuid = 'Account Group is required';
    }
    
    if (!formData.code) {
      newErrors.code = 'Code is required';
    }
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
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
          Account Master
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse">
            <tbody>
              {/* First Row: Account Group and Code */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="accountGroupMasterUuid" className="block text-sm font-medium text-gray-700">
                    Account Group
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <select
                    id="accountGroupMasterUuid"
                    name="accountGroupMasterUuid"
                    value={formData.accountGroupMasterUuid}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm 
                      ${errors.accountGroupMasterUuid ? "border-red-500 focus:border-red-500" : "focus:border-indigo-300"}
                      focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  >
                    <option value="">Select Account Group</option>
                    {accountGroups.map((group) => (
                      <option key={group.uuid} value={group.uuid}>
                        {`${group.code} - ${group.name}`}
                      </option>
                    ))}
                  </select>
                  {errors.accountGroupMasterUuid && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.accountGroupMasterUuid}
                    </p>
                  )}
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Account Code
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

              {/* Name Row with Colspan */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Account Name 
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

              {/* Address Lines */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                    Address Line 1 
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    maxLength={35}
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                    Address Line 2 
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    maxLength={35}
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
              </tr>

              {/* GST No and City */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="gstNo" className="block text-sm font-medium text-gray-700">
                    GST No 
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="gstNo"
                    name="gstNo"
                    maxLength={15}
                    value={formData.gstNo}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City 
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="city"
                    name="city"
                    maxLength={25}
                    value={formData.city}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
              </tr>

              {/* State and Mobile No */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                    Mobile No 
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="mobileNo"
                    name="mobileNo"
                    maxLength={25}
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
              </tr>

              {/* Opening Balance */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="openingBalance" className="block text-sm font-medium text-gray-700">
                    Opening Balance 
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="openingBalance"
                    name="openingBalance"
                    type="text"
                    value={formData.openingBalance}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
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

export default AccountMasterForm;