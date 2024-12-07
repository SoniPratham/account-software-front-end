import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ItemMasterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    itemGroupMasterUuid: '',
    per: '',
    stock: '',
    openingStockAmount: '',
    reOrderLevel: '',
    purchaseRate: '',
    stockRate: '',
    salesRate: '',
    gstTax: '',
    hsnCode: '',
    descrption: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemGroups, setItemGroups] = useState([]); // Placeholder for item groups

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Item Master
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse">
            <tbody>
              {/* First Row: Item Group and Item Code */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="itemGroupMasterUuid" className="block text-sm font-medium text-gray-700">
                    Item Group
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <select
                    id="itemGroupMasterUuid"
                    name="itemGroupMasterUuid"
                    value={formData.itemGroupMasterUuid}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm 
                      ${errors.itemGroupMasterUuid ? "border-red-500 focus:border-red-500" : "focus:border-indigo-300"}
                      focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  >
                    <option value="">Select Item Group</option>
                    {itemGroups.map((group) => (
                      <option key={group.uuid} value={group.uuid}>
                        {`${group.code} - ${group.name}`}
                      </option>
                    ))}
                  </select>
                  {errors.itemGroupMasterUuid && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.itemGroupMasterUuid}
                    </p>
                  )}
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Item Code
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="code"
                    name="code"
                    type="number"
                    maxLength={5}
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
                    Item Name
                  </label>
                </td>
                <td colSpan={3} className="p-2 w-3/4">
                  <input
                    id="name"
                    name="name"
                    maxLength={50}
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

              {/* Rates Row */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="purchaseRate" className="block text-sm font-medium text-gray-700">
                    Purchase Rate
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="purchaseRate"
                    name="purchaseRate"
                    type="number"
                    step="0.01"
                    max="99999999.99"
                    value={formData.purchaseRate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="stockRate" className="block text-sm font-medium text-gray-700">
                    Stock Rate
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="stockRate"
                    name="stockRate"
                    type="number"
                    step="0.01"
                    max="99999999.99"
                    value={formData.stockRate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
              </tr>

              {/* Sales Rate and GST Row */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="salesRate" className="block text-sm font-medium text-gray-700">
                    Sales Rate
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="salesRate"
                    name="salesRate"
                    type="number"
                    step="0.01"
                    max="99999999.99"
                    value={formData.salesRate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="gstTax" className="block text-sm font-medium text-gray-700">
                    GST ( % )
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <select
                    id="gstTax"
                    name="gstTax"
                    value={formData.gstTax}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm 
                      ${errors.gstTax ? "border-red-500 focus:border-red-500" : "focus:border-indigo-300"}
                      focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  >
                    <option value="">Select Percentage</option>
                    {[2, 5, 12, 18, 28].map((percentage) => (
                      <option key={percentage} value={percentage}>
                        {percentage}%
                      </option>
                    ))}
                  </select>
                  {errors.gstTax && (
                    <p className="mt-1 text-xs text-red-500">{errors.gstTax}</p>
                  )}
                </td>
              </tr>

              {/* HSN Code and Per Row */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="hsnCode" className="block text-sm font-medium text-gray-700">
                    HSN Code
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <input
                    id="hsnCode"
                    name="hsnCode"
                    type="number"
                    maxLength={8}
                    value={formData.hsnCode}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </td>
                <td className="p-2 w-1/4">
                  <label htmlFor="per" className="block text-sm font-medium text-gray-700">
                    Per
                  </label>
                </td>
                <td className="p-2 w-1/4">
                  <select
                    id="per"
                    name="per"
                    value={formData.per}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm 
                      ${errors.per ? "border-red-500 focus:border-red-500" : "focus:border-indigo-300"}
                      focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  >
                    <option value="">Select Per</option>
                    {[
                      { value: 'Q', label: 'Q ( Quantity )' },
                      { value: 'P', label: 'P ( pcs )' },
                      { value: 'K', label: 'K ( KG )' },
                      { value: 'M', label: 'M ( Meter )' },
                      { value: 'L', label: 'L ( Liter )' }
                    ].map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.per && (
                    <p className="mt-1 text-xs text-red-500">{errors.per}</p>
                  )}
                </td>
              </tr>

              {/* Description */}
              <tr>
                <td className="p-2 w-1/4">
                  <label htmlFor="descrption" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                </td>
                <td colSpan={3} className="p-2 w-3/4">
                  <input
                    id="descrption"
                    name="descrption"
                    maxLength={50}
                    value={formData.descrption}
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

export default ItemMasterForm;