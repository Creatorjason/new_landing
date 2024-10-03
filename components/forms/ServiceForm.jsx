import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ServiceForm = ({ setIsServicesSuccess, verseId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
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
   
    const submitFormData = new FormData();
    submitFormData.append('title', formData.title);
    submitFormData.append('description', formData.description);
    submitFormData.append('price', parseInt(formData.price, 10)); // Ensure price is an integer
    if (formData.file) {
      submitFormData.append('file', formData.file);
    }

    const toastId = toast.loading('Adding Service...');

    try {
      const response = await axios.post(
        `https://api.granularx.com/verse/services/add/${verseId}`, 
        submitFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 && response.data.status === 'SUCCESS') {
        toast.success('Service added successfully!', { id: toastId });
        setIsServicesSuccess(true);
      } else {
        toast.error('Failed to add service. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', { id: toastId });
    }
  };

  return (
    <form className="flex flex-col gap-y-6 p-2 text-sm" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title">Service Name <span className='text-red-600'>*</span></Label>
        <Input 
          type="text" 
          name="title" 
          id="title" 
          placeholder="Enter Service name" 
          onChange={handleInputChange} 
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Service Description <span className='text-red-600'>*</span></Label>
        <Textarea 
          name="description" 
          className="resize-none border border-[#141f1f]" 
          id="description" 
          placeholder="Enter Service description" 
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Service Price <span className='text-red-600'>*</span></Label>
        <Input 
          type="number" 
          name="price" 
          id="price" 
          placeholder="Enter Service price" 
          onChange={handleInputChange} 
          step="0.01"
          required
        />
      </div>
      <div>
        <Label htmlFor="file">Upload Image</Label>
        <Input type="file" name="file" id="file" accept="image/jpeg, image/jpg, image/png" onChange={handleFileChange} />
      </div>
      <Button className='bg-[#141f1f] text-white text-sm' type="submit">Add Service</Button>
    </form>
  );
};

export default ServiceForm;