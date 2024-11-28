import{ useState, useEffect } from 'react';

const ItemMasterController = () => {
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

export default ItemMasterController;