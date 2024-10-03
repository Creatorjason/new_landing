import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ContentForm = ({ setIsProductSuccess, verseId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '1',
    file: null
  });

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      file: e.target.files[0]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10)
    };

    const toastId = toast.loading('Adding product...');

    try {
      const response = await axios.post(`https://api.granularx.com/verse/products/add/${verseId}`, submitData);

      if (response.status === 200 && response.data.status === 'SUCCESS') {
        toast.success('Product added successfully!', { id: toastId });
        setIsProductSuccess(true);
      } else {
        toast.error('Failed to add product. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', { id: toastId });
    }
  };

  return (
    <form className="flex flex-col gap-y-6 p-2 text-sm" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Product Name <span className='text-red-600'>*</span></Label>
        <Input 
          type="text" 
          name="title" 
          id="title"
          placeholder="Enter product name" 
          onChange={handleInputChange} 
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Product Description <span className='text-red-600'>*</span></Label>
        <Textarea 
          name="description" 
          className="resize-none border border-[#141f1f]" 
          id="description" 
          placeholder="Enter product description" 
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Product Price <span className='text-red-600'>*</span></Label>
        <Input 
          type="number" 
          name="price" 
          id="price" 
          placeholder="Enter product price" 
          onChange={handleInputChange} 
          step="0.01"
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity <span className='text-red-600'>*</span></Label>
        <Select name="quantity" onValueChange={(value) => handleInputChange({ target: { name: 'quantity', value } })}>
          <SelectTrigger className="border border-[#141f1f]">
            <SelectValue placeholder="Select quantity" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="file">Upload Image</Label>
        <Input type="file" name="file" id="file" accept="image/jpeg,image/png" onChange={handleInputChange} />
      </div>
      <Button className='bg-[#141f1f] text-white text-sm' type="submit">Add Product</Button>
    </form>
  );
};

export default ContentForm;