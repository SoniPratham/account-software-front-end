import{ useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const useItemMasterController = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    descrption: '',
    gstTax: '',
    stock: '',
    reOrderLevel: '',
    hsnCode: '',
    itemGroupMasterUuid: '',
    per: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemGroups, setItemGroups] = useState([]);

  useEffect(() => {
    // Fetch item groups on component mount
    const fetchItemGroups = async () => {
      try {
        const response = await fetch('http://localhost:8262/account/software/book/group/master/list?pageNumber=1&pageSize=10');
        const result = await response.json();
        setItemGroups(result.data);
      } catch (error) {
        console.error('Failed to fetch item groups:', error);
      }
    };

    fetchItemGroups();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'code', 'itemGroupMasterUuid', 'per'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
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
        const response = await fetch('http://localhost:8262/account/software/item-master', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            code: Number(formData.code),
            gstTax: Number(formData.gstTax),
            stock: Number(formData.stock),
            reOrderLevel: Number(formData.reOrderLevel),
            hsnCode: Number(formData.hsnCode)
          })
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        const responseData = await response.json();
        console.log('Submission successful:', responseData);
        setFormData({
          name: '',
          code: '',
          descrption: '',
          gstTax: '',
          stock: '',
          reOrderLevel: '',
          hsnCode: '',
          itemGroupMasterUuid: '',
          per: ''
        });
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    handleInputChange,
    handleSubmit,
    formData,
    setFormData,
    errors,
    isSubmitting,
    itemGroups
  };
};

const ItemMasterForm = () => {
  const {
    handleInputChange, 
    handleSubmit, 
    formData,
    errors,
    isSubmitting,
    itemGroups
  } = useItemMasterController();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Item Master</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name
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

            {/* Item Code */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Item Code
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

            {/* Description */}
            <div>
              <label htmlFor="descrption" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                id="descrption"
                name="descrption"
                value={formData.descrption}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Item Group */}
            <div>
              <label htmlFor="itemGroupMasterUuid" className="block text-sm font-medium text-gray-700">
                Item Group
              </label>
              <select
                id="itemGroupMasterUuid"
                name="itemGroupMasterUuid"
                value={formData.itemGroupMasterUuid}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.itemGroupMasterUuid ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              >
                <option value="">Select Item Group</option>
                {itemGroups.map(group => (
                  <option key={group.uuid} value={group.uuid}>
                    {`${group.code} - ${group.name}`}
                  </option>
                ))}
              </select>
              {errors.itemGroupMasterUuid && (
                <p className="mt-1 text-xs text-red-500">{errors.itemGroupMasterUuid}</p>
              )}
            </div>

            {/* GST Tax */}
            <div>
              <label htmlFor="gstTax" className="block text-sm font-medium text-gray-700">
                GST Tax
              </label>
              <input
                id="gstTax"
                name="gstTax"
                type="number"
                value={formData.gstTax}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Re-Order Level */}
            <div>
              <label htmlFor="reOrderLevel" className="block text-sm font-medium text-gray-700">
                Re-Order Level
              </label>
              <input
                id="reOrderLevel"
                name="reOrderLevel"
                type="number"
                value={formData.reOrderLevel}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* HSN Code */}
            <div>
              <label htmlFor="hsnCode" className="block text-sm font-medium text-gray-700">
                HSN Code
              </label>
              <input
                id="hsnCode"
                name="hsnCode"
                type="number"
                value={formData.hsnCode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Per */}
            <div>
              <label htmlFor="per" className="block text-sm font-medium text-gray-700">
                Per
              </label>
              <select
                id="per"
                name="per"
                value={formData.per}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  ${errors.per ? 'border-red-500 focus:border-red-500' : 'focus:border-indigo-300'}
                  focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              >
                <option value="">Select Per</option>
                <option value="Q">Q (Quarterly)</option>
                <option value="P">P</option>
                <option value="K">K</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
              {errors.per && (
                <p className="mt-1 text-xs text-red-500">{errors.per}</p>
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

export default ItemMasterForm;