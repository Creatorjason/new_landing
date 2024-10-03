import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const VerseForm = ({ onSubmit, setIsVerseSuccess, fetchVerses, session }) => {
  const [formData, setFormData] = useState({
    uns: session.user.username,
    cta_title: '',
    header_title: '',
    header_description: '',
    sector: '',
    vtype: '',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }
  
    const toastId = toast.loading('Creating verse...');
  
    try {
      const response = await axios.post('https://api.granularx.com/verse/create', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      if (response.status === 200 && response.data.status === 'SUCCESS') {
        toast.success('Verse created successfully!', { id: toastId });
        setIsVerseSuccess(true);
        fetchVerses();
      } else {
        toast.error('Failed to create verse. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.', { id: toastId });
    }
  };
  

  return (
    <form className="flex flex-col gap-y-6 p-2 text-sm" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="cta_title">CTA Title <span className='text-red-600'>*</span></Label>
        <Input type="text" name="cta_title" id="cta_title" placeholder="Enter CTA Title" onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="header_title">Header Title <span className='text-red-600'>*</span></Label>
        <Input type="text" name="header_title" id="header_title" placeholder="Enter Header Title" onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="header_description">Header Description <span className='text-red-600'>*</span></Label>
        <Textarea name="header_description" className="resize-none border border-[#141f1f]" id="header_description" placeholder="Enter Header Description" onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="sector">Sector <span className='text-red-600'>*</span></Label>
        <Select name="sector" onValueChange={(value) => handleInputChange({ target: { name: 'sector', value } })}>
          <SelectTrigger className="border border-[#141f1f]">
            <SelectValue placeholder="Select a sector" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Verse Type <span className='text-red-600'>*</span></Label>
        <RadioGroup name="vtype" onValueChange={(value) => handleInputChange({ target: { name: 'vtype', value } })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="with_servant" id="with_servant" />
            <Label htmlFor="with_servant">With Soft Servant</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="without_servant" id="without_servant" />
            <Label htmlFor="without_servant">Without Soft Servant</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="file">Upload Image <span className='text-red-600'>*</span></Label>
        <Input type="file" name="file" id="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
      </div>
      <Button className='bg-[#141f1f] text-white text-sm' type="submit">Create Verse</Button>
    </form>
  );
};

export default VerseForm;