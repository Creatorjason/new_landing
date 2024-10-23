"use client"

import React, { useEffect, useState } from 'react';
import { ArrowDown2, ShoppingCart } from 'iconsax-react';
import { motion } from 'framer-motion'
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import VersesModal from './VersesModal'
import axios from 'axios';
import VerseForm from '@/components/forms/VerseForm'
import ProductForm from '@/components/forms/ProductForm'
import ServiceForm from '@/components/forms/ServiceForm'
import ContentForm from '@/components/forms/ContentForm'
import EmptyProductState from '@/components/EmptyProductState'
import { AlertCircle, ChevronDown, FileText, Package, Wrench } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const VerseItem = ({ product }) => {
  const { title, description, url: imageSrc, price } = product.content;
  const quantity = product?.qtn;
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log(`Added ${title} to cart`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="w-full dark:border dark:border-gray-600 max-w-sm cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Image src={imageSrc} alt={title} width={80} height={80} className="rounded-md aspect-square object-cover" />
              <div>
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-base md:text-xl font-bold">NGN {price.toFixed(2)}</span>
              {quantity && (
                <Badge variant="secondary">
                  Quantity: {quantity}
                </Badge>
              )}
            </div>
          </CardContent>
          {quantity && (
            <CardFooter>
              {quantity <= 5 && (
                <div className="flex items-center text-yellow-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Only {quantity} units left - Don&apos;t miss out!</span>
                </div>
              )}
            </CardFooter>
          )}
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] sm:max-w-sm dark:border dark:border-gray-600 rounded-md sm:mx-0 bg-white dark:bg-[#1c2626]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-center">
          <div className="flex justify-center">
            <Image src={imageSrc} alt={title} width={200} height={200} className="rounded-md aspect-square object-cover" />
          </div>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">NGN {price.toFixed(2)}</span>
            {quantity && (
              <Badge variant="secondary">
                Quantity: {quantity}
              </Badge>
            )}
          </div>
          {quantity && quantity <= 5 && (
            <div className="flex items-center text-yellow-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Only {quantity} units left - Don&apos;t miss out!</span>
            </div>
          )}
        </div>
        <Button onClick={handleAddToCart} className="w-full bg-[#141f1f] dark:border dark:border-gray-600 text-white">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const SuccessMessage = ({ title, message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-center flex flex-col items-center"
  >
    <div className='bg-[#7DF9FF1A] border border-[#7DF9FF70] p-4 mb-4 rounded-lg w-max'>
      <Image src="/confetti.svg" alt="Success" width={64} height={64} />
    </div>
    <h2 className="text-lg md:text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-200 text-sm md:text-base mb-6">{message}</p>
    <button
      onClick={onClose}
      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#141f1f]"
    >
      Done
    </button>
  </motion.div>
);

const MyVerseView = ({ session }) => {
  const [verses, setVerses] = useState(null);
  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [contents, setContents] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerseModalOpen, setIsVerseModalOpen] = useState(false);
  const [isVerseSuccess, setIsVerseSuccess] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isServicesSuccess, setIsServicesSuccess] = useState(false);
  const [isContentsModalOpen, setIsContentsModalOpen] = useState(false);
  const [isContentsSuccess, setIsContentsSuccess] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductSuccess, setIsProductSuccess] = useState(false);

  useEffect(() => {
    fetchVerses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVerses = async () => {
    try {
      setIsLoading(true);
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.get(`https://api.granularx.com/verse/${session.user.username}`, {
        headers: {
          'Authorization': `Bearer ${session.authToken}`
        }
      });
      setVerses(response.data.data);
      setProducts(response.data.data.verse_products)
      setServices(response.data.data.verse_services)
      setContents(response.data.data.verse_content)
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch verses');
      setIsLoading(false);
    }
  };

  const createVerseModal = () => {
    setIsVerseModalOpen(true);
  };
  const closeVerseModal = () => {
    setIsVerseModalOpen(false);
    setIsVerseSuccess(false);
  };

  const createProductModal = () => {
    setIsProductModalOpen(true);
  };
  const closeProductModal = () => {
    fetchVerses();
    setIsProductModalOpen(false);
    setIsProductSuccess(false);
  };

  const createServicesModal = () => {
    setIsServicesModalOpen(true);
  };
  const closeServicesModal = () => {
    fetchVerses();
    setIsServicesModalOpen(false);
    setIsServicesSuccess(false);
  };

  const createContentsModal = () => {
    setIsContentsModalOpen(true);
  };
  const closeContentsModal = () => {
    fetchVerses();
    setIsContentsModalOpen(false);
    setIsContentsSuccess(false);
  };
  
  const EmptyState = () => (
    <div className="text-center py-12">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Create a verse</h3>
      <p className="mt-1 text-sm max-w-[30ch] mx-auto text-gray-500">You haven&apos;t created a verse yet. Get started by creating a new verse.</p>
      <div className="mt-6">
        <button
          onClick={createVerseModal}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#141f1f] hover:bg-[#141f1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#141f1f]"
        >
          Create Verse
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-0 md:py-4">
      {verses && 
        <>
          <div className='bg-gray-500 py-10 overflow-hidden flex flex-col items-center justify-center rounded-lg bg-auto relative bg-opacity-35 bg-center'
            style={{backgroundImage: `url(${verses?.verse_header.header_banner_url})`, backgroundSize: 'cover'}}>
            <div className='absolute bg-black opacity-65 inset-0 z-0'></div>
            <div className='z-10 flex flex-col items-center justify-center text-center gap-y-8 p-4'>
              <div>
                <p className='text-white text-3xl md:text-6xl mb-1 font-extrabold'>{verses.verse_header.header_title}</p>
                <p className='text-gray-100 text-base max-w-[50ch]'>{verses.verse_header.header_description}</p>
              </div>
              <div className='flex items-center gap-x-2'>
                <div className="mt-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="dark:bg-[#141F1F] bg-white text-[#141f1f] border-none hover:bg-gray-300 dark:text-white dark:hover:bg-[#1c2626]">
                        Create <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-[#141f1f]">
                      <DropdownMenuLabel className="font-normal text-sm text-gray-500 dark:text-gray-300">Verses Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem 
                        onClick={createProductModal} 
                        className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100"
                      >
                        <Package className="h-4 w-4" /> Create Product
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={createServicesModal} 
                        className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100"
                      >
                        <Wrench className="h-4 w-4" /> Create Service
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={createContentsModal} 
                        className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100"
                      >
                        <FileText className="h-4 w-4" /> Create Content
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </>
      }

      {/* List goes here */}
      <div className="mt-6">
        {isLoading ? (
          <p className='py-12 flex items-center justify-center text-sm font-medium'>Loading verses...</p>
        ) : !verses && (
          <EmptyState />
        )}
        
        {verses?.verse_products.length === 0 && verses?.verse_services.length === 0 && verses?.verse_content.length === 0 ? (
          <EmptyProductState createProductModal={createProductModal} />
        ) : products.length > 0 && (
          <div>
            <h2 className='text-xl font-bold mb-2'>Products</h2>
            <div className="p-4 rounded-md bg-white dark:bg-[#1c2626] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <VerseItem key={product.content.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {services.length > 0 && (
          <div className='mt-4'>
            <h2 className='text-xl font-bold mb-2'>Services</h2>
            <div className="p-4 rounded-md bg-white dark:bg-[#1c2626] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((product) => (
                <VerseItem key={product.content.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {contents.length > 0 && (
          <div className='mt-4'>
            <h2 className='text-xl font-bold mb-2'>Contents</h2>
            <div className="p-4 rounded-md bg-white dark:bg-[#1c2626] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {contents.map((product) => (
                <VerseItem key={product.content.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <VersesModal isOpen={isProductModalOpen} onClose={closeProductModal} title="Create Product">
        {isProductSuccess ? (
          <SuccessMessage
            title="Product Created Successfully!"
            message="You have successfully created this product!"
            onClose={closeProductModal}
          />
        ) : (
          <ProductForm setIsProductSuccess={setIsProductSuccess} verseId={verses?.id} />
        )}
      </VersesModal>
      
      <VersesModal isOpen={isServicesModalOpen} onClose={closeServicesModal} title="Create Service">
        {isServicesSuccess ? (
          <SuccessMessage
            title="Service Created Successfully!"
            message="You have successfully created this service!"
            onClose={closeServicesModal}
          />
        ) : (
          <ServiceForm setIsServicesSuccess={setIsServicesSuccess} verseId={verses?.id} />
        )}
      </VersesModal>

      <VersesModal isOpen={isContentsModalOpen} onClose={closeContentsModal} title="Create Content">
        {isContentsSuccess ? (
          <SuccessMessage
            title="Content Created Successfully!"
            message="You have successfully created this content!"
            onClose={closeContentsModal}
          />
        ) : (
          <ContentForm setIsContentsSuccess={setIsContentsSuccess} verseId={verses?.id} />
        )}
      </VersesModal>

      <VersesModal isOpen={isVerseModalOpen} onClose={closeVerseModal} title="Create Verse">
        {isVerseSuccess ? (
          <SuccessMessage
            title="Verse Created Successfully!"
            message="You have successfully created this verse!"
            onClose={closeVerseModal}
          />
        ) : (
          <VerseForm session={session} setIsVerseSuccess={setIsVerseSuccess} fetchVerses={fetchVerses} />
        )}
      </VersesModal>
    </div>
  );
};

export default MyVerseView;