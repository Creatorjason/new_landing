import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Wallet, RefreshCw, RotateCcw } from "lucide-react";

const PaymentDropdown = ({ setIsModalOpen, setMITD }) => {
  const handleAction = (action) => {
    switch (action) {
      case 'transfer':
        setIsModalOpen(true);
        break;
      case 'reverseTransaction':
        setMITD(true);
        break;
      default:
        console.log('Unknown action');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-[#141F1F] text-white">
          Actions <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-[#141f1f]">
        <DropdownMenuLabel className="font-normal text-sm text-gray-500 dark:text-gray-300">Payment Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction('transfer')} className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100">
          <Wallet className="h-4 w-4" /> Transfer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction('reverseTransaction')} className="flex items-center gap-2 cursor-pointer dark:hover:bg-[#1c2626] hover:bg-gray-100">
          <RotateCcw className="h-4 w-4" /> Reverse Transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaymentDropdown;