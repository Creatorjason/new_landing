import React, { useRef, useEffect, useState } from 'react';
import { CloseCircle, Receipt1 } from 'iconsax-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Receipt = ({ amount, date, status, transactionType, bankName, accountNumber, resetModal, accountName, transactionID, onClose }) => {
  const receiptRef = useRef(null);
  const pdfReceiptRef = useRef(null);
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    import('html2pdf.js').then((module) => {
      setHtml2pdf(() => module.default);
    });
  }, []);

  const handleDownload = async () => {
    if (!html2pdf) {
      console.error('html2pdf is not loaded yet');
      return;
    }

    const element = pdfReceiptRef.current;
    const opt = {
      margin: 10,
      filename: `GX_Receipt-${transactionID}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      element.style.display = 'block';
      await html2pdf().from(element).set(opt).save();
      element.style.display = 'none';
      onclose();
      resetModal();
      localStorage.removeItem("reference");
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={receiptRef} className="bg-white dark:bg-[#1C2626] rounded-lg p-6 w-[23rem] mx-3 md:m-0 relative">
        <div className="mb-4 border-b border-dashed border-[#999999] bg-transparent dark:border-[#dbdbdb]">
          <div className='mb-4 flex items-center justify-between'>
            <h2 className="text-base font-semibold text-center">Transaction Receipt</h2>
            <button onClick={onClose}><CloseCircle className="text-[#141F1F] dark:text-white"/></button>
          </div>
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-green-700 dark:text-[#11BB16]">+₦{amount}</p>
            <p className="text-[#666666] dark:text-[#dbdbdb] text-sm">{date}</p>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-y-4">
          <p className='flex items-center justify-between text-sm md:text-base text-[#666666] dark:text-gray-400'>
            <strong>Status:</strong> 
            <span className="text-[#11BB16] py-1 px-3 rounded-full text-sm bg-[#E8FDE8] dark:bg-[#11bb172c]">{status}</span>
          </p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'>
            <strong className='text-[#666666] dark:text-gray-400'>Transaction Type:</strong> {transactionType}
          </p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'>
            <strong className='text-[#666666] dark:text-gray-400'>Bank Name:</strong> {bankName}
          </p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'>
            <strong className='text-[#666666] dark:text-gray-400'>Reference:</strong> {accountNumber}
          </p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'>
            <strong className='text-[#666666] dark:text-gray-400'>Account Name:</strong> {accountName}
          </p>
          <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F] dark:text-white'>
            <strong className='text-[#666666] dark:text-gray-400'>Transaction ID:</strong> {transactionID}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-[#141F1F] w-full text-white p-3 text-sm md:text-base rounded flex items-center justify-center gap-x-2 dark:shadow dark:shadow-[#7df8ff3d]"
          >
            <span>Download Receipt</span>
            <Receipt1 size={18} color="#FFFFFF"/>
          </button>
        </div>
      </div>

      {/* Hidden receipt for PDF generation */}
      <div ref={pdfReceiptRef} className="hidden">
        <div className='m-auto max-w-lg h-full pb-10'>
          <div className="mb-4 py-2 border-b border-dashed border-[#999999] bg-transparent">
            <div className='flex justify-center items-center h-14 mb-4'>
              <Image src={"/brand/brand.png"} alt='' width={50} height={50} />
              <p className='text-lg ml-1 font-semibold text-[#141F1F]'>GranularX</p>
            </div>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className="text-base text-[#141F1F] font-semibold text-center">Transaction Receipt</h2>
            </div>
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-green-700">+₦{amount}</p>
              <p className="text-[#666666] text-sm">{date}</p>
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-y-4 border-b border-dashed border-[#999999] py-2 pb-6">
            <p className='flex items-center justify-between text-sm md:text-base text-[#666666]'>
              <strong>Status:</strong> 
              <span className="text-[#11BB16] text-sm">{status}</span>
            </p>
            <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F]'>
              <strong className='text-[#666666]'>Transaction Type:</strong> {transactionType}
            </p>
            <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F]'>
              <strong className='text-[#666666]'>Bank Name:</strong> {bankName}
            </p>
            <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F]'>
              <strong className='text-[#666666]'>Reference:</strong> {accountNumber}
            </p>
            <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F]'>
              <strong className='text-[#666666]'>Account Name:</strong> {accountName}
            </p>
            <p className='flex items-center justify-between text-sm md:text-base text-[#0F0F0F]'>
              <strong className='text-[#666666]'>Transaction ID:</strong> {transactionID}
            </p>
          </div>
          <div className='text-center text-[#666666] text-sm relative'>
            <p><strong>Support:</strong> support@granularx.com</p>
            <p className='mt-4 text-sm'>
              Enjoy a borderless and seamless transfers with lightning-fast transactions,<br />and more, on GranularX.
              GranularX is licensed by the Central Bank of Nigeria and<br /> insured by the NDIC (just kidding)
            </p>

            <Image src={"/brand/approved.svg"} alt='' width={100} height={100} className='absolute bottom-0 right-0' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Receipt), { ssr: false });