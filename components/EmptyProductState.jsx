import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Package, Wrench, FileText } from "lucide-react";

const EmptyProductState = ({ createProductModal, createServiceModal, createContentModal }) => {
  const handleAction = (action) => {
    switch (action) {
      case 'createProduct':
        createProductModal();
        break;
      case 'createService':
        createServiceModal();
        break;
      case 'createContent':
        createContentModal();
        break;
      default:
        console.log('Unknown action');
    }
  };

  return (
    <div className="text-center py-12">
      <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Build your store</h3>
      <p className="mt-1 text-sm max-w-[30ch] mx-auto text-gray-500 dark:text-gray-400">
        You haven&apos;t created a product, service or content yet. Get started by choosing from any of the options below.
      </p>
      <div className="mt-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-[#141F1F] text-white hover:bg-[#1c2626]">
              Create <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-[#141f1f]">
            <DropdownMenuLabel className="font-normal text-sm text-gray-500 dark:text-gray-300">Verses Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => handleAction('createProduct')} 
              className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100"
            >
              <Package className="h-4 w-4" /> Create Product
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleAction('createService')} 
              className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100"
            >
              <Wrench className="h-4 w-4" /> Create Service
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleAction('createContent')} 
              className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100"
            >
              <FileText className="h-4 w-4" /> Create Content
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EmptyProductState;