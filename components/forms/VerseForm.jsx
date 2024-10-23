import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react'; // Import X icon for removing tags

const VerseForm = ({ setIsVerseSuccess, fetchVerses, session }) => {
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    uns: session.user.username,
    name: '',
    cta_title: '',
    header_title: '',
    header_description: '',
    sector: '',
    vtype: '',
    file: null
  });

  const invertedSectorsMap = {
    "Agriculture": "Agriculture",
    "ArtDesign": "Art & Design",
    "Automotive": "Automotive",
    "BankingFinancialServices": "Banking & Financial Services",
    "ConstructionRealEstate": "Construction & Real Estate",
    "ConsumerGoods": "Consumer Goods",
    "Education": "Education",
    "Energy": "Energy",
    "EntertainmentMedia": "Entertainment & Media",
    "EnvironmentalSustainability": "Environmental Sustainability",
    "FashionBeauty": "Fashion & Beauty",
    "FoodBeverage": "Food & Beverage",
    "GovernmentPublicServices": "Government & Public Services",
    "Healthcare": "Healthcare",
    "HospitalityTourism": "Hospitality & Tourism",
    "InformationTechnology": "Information Technology",
    "LegalProfessionalServices": "Legal & Professional Services",
    "LogisticsTransportation": "Logistics & Transportation",
    "Manufacturing": "Manufacturing",
    "MiningMetals": "Mining & Metals",
    "NonprofitSocialEnterprises": "Nonprofit & Social Enterprises",
    "Retail": "Retail",
    "SportsRecreation": "Sports & Recreation",
    "TechnologyInnovation": "Technology & Innovation",
    "Telecommunications": "Telecommunications"
  };  

  const sectorsTags = {
    "Logistics & Transportation": ["people", "goods"],
    "Food & Beverage": ["traditional", "continental", "intercontinental"]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'sector') {
      const sectorTags = sectorsTags[value] || [];
      setTags(sectorTags);
    }
  };
  
  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      file: e.target.files[0]
    }));
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setTags(prevTags => {
      if (prevTags.includes(selectedTag)) {
        return prevTags.filter(tag => tag !== selectedTag);
      } else {
        return [...prevTags, selectedTag];
      }
    });
  };

  const removeTag = (tagToRemove) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }

    tags.forEach((tag) => submitData.append('tags', tag));
  
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
    <form className="flex flex-col gap-y-6 max-h-[500px] overflow-y-auto p-2 text-sm" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Verse Name<span className='text-red-600'>*</span></Label>
        <Input type="text" name="name" id="name" placeholder="Enter Verse Name" onChange={handleInputChange} />
      </div>
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
            {Object.entries(invertedSectorsMap).map(([key, value]) => (
              <SelectItem key={key} value={value}>{value}</SelectItem>
            ))}
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
      <div>
        <Label htmlFor="tags">Tags</Label>
        <select
          id="tags"
          name="tags"
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={handleTagChange}
          value={tags}
          multiple
        >
          {sectorsTags[formData.sector]?.map((tag, index) => (
            <option key={index} value={tag} className='text-sm capitalize'>
              {tag}
            </option>
          ))}
        </select>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
      <Button className='bg-[#141f1f] text-white text-sm' type="submit">Create Verse</Button>
    </form>
  );
};

export default VerseForm;
