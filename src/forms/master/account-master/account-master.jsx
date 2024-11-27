import React from 'react';
import MasterController from './master-controller';

const AccountMasterForm = () => {
  const {handleCheckboxChange, handleInputChange, handleSubmit, formData} = MasterController();
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Master</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
          <input
            id="code"
            name="code"
            type="number"
            value={formData.code}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="accountGroupMasterName" className="block text-sm font-medium text-gray-700">Account Group</label>
          <input
            id="accountGroupMasterName"
            name="accountGroupMasterName"
            value={formData.accountGroupMasterName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="gstNo" className="block text-sm font-medium text-gray-700">GST No</label>
          <input
            id="gstNo"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="stateName" className="block text-sm font-medium text-gray-700">State</label>
          <input
            id="stateName"
            name="stateName"
            value={formData.stateName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div className="col-span-full">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="openingBalance" className="block text-sm font-medium text-gray-700">Opening Balance</label>
          <input
            id="openingBalance"
            name="openingBalance"
            type="number"
            step="0.01"
            value={formData.openingBalance}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">Transaction Type</label>
          <select 
            id="transactionType"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select transaction type</option>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="brokerMasterName" className="block text-sm font-medium text-gray-700">Broker</label>
          <input
            id="brokerMasterName"
            name="brokerMasterName"
            value={formData.brokerMasterName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
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
      
      <div className="mt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AccountMasterForm;