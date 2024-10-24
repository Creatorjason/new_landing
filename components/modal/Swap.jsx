import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle, ArrowDown2, ArrowSwapHorizontal, InfoCircle, TickCircle } from 'iconsax-react';
import { toast } from 'react-hot-toast';
import { CircleHelp } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Swap = ({ isOpen, onClose, balance, onSwapComplete }) => {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromCurrency: 'NGN',
    toCurrency: 'USD',
    amount: '',
  });
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // Replace 'YOUR_API_KEY' with your actual API key
      const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.NEXT_PUBLIC_EXCHANGE_RATES_API_KEY}`);
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      toast.error('Failed to fetch exchange rates');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post('https://api.granularx.com/wallet/swap', {
        uns: session.user.username,
        amount: parseInt(formData.amount),
        base_currency: formData.fromCurrency,
        rebase_currency: formData.toCurrency
      }, {
        headers: {
          'Authorization': `Bearer ${session.authToken}`,
          'x-csrf-token': session.csrfToken,
        },
      });

      if (response.data.status === "SUCCESS") {
        toast.success('Swap processed successfully');
        onSwapComplete();
        setStep(3);
      } else {
        toast.error(response.data.error || 'Swap failed');
      }
    } catch (error) {
      console.error('Error processing swap:', error);
      toast.error('Failed to process swap');
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ fromCurrency: 'NGN', toCurrency: 'USD', amount: '' });
    onClose();
  };

  const calculateExchangeRate = () => {
    if (!exchangeRates[formData.toCurrency]) return 'N/A';
    const rate = exchangeRates[formData.fromCurrency] / exchangeRates[formData.toCurrency];
    return (rate * formData.amount).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-[#1C2626] rounded-lg p-6 w-[23rem] mx-3 md:m-0 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold flex items-center gap-x-2">
                <ArrowSwapHorizontal size="20" className='text-[#141F1F] dark:text-white'/> <span>Swap Fiatons</span>
              </h2>
              <button onClick={handleClose}>
                <CloseCircle className="text-[#141F1F] dark:text-white" />
              </button>
            </div>

            <AnimatePresence mode='wait'>
              {step === 1 && (
                <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm mb-2 dark:text-gray-300">Enter Currency and Amount</p>
                  <div className="bg-gray-100 dark:bg-[#141F1F] p-3 rounded-lg">
                    <div className="flex items-center justify-between gap-x-2 w-full">
                      <select
                        name="toCurrency"
                        value={formData.toCurrency}
                        onChange={handleInputChange}
                        className="dark:bg-[#141F1F] bg-transparent text-lg font-semibold outline-none dark:text-white"
                      >
                        {Object.keys(exchangeRates).map((currency) => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="bg-transparent text-lg w-[inherit] font-semibold outline-none dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-center my-4">
                    <ArrowDown2 size="24" className="text-[#141F1F] dark:text-white" />
                  </div>
                  <p className="text-sm mb-2 dark:text-gray-300">Currency Exchange Rate</p>
                  <div className="mb-4 bg-gray-100 dark:bg-[#141F1F] p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg font-semibold mr-2 dark:text-white">{formData.toCurrency}</span>
                        <ArrowSwapHorizontal size="20" className="text-[#141F1F] dark:text-white mx-2" />
                        <select
                          name="fromCurrency"
                          value={formData.fromCurrency}
                          onChange={handleInputChange}
                          className="dark:bg-[#141F1F] bg-transparent text-lg font-semibold outline-none dark:text-white ml-2"
                        >
                          {Object.keys(exchangeRates).map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                          ))}
                        </select>
                      </div>
                      <span className="text-lg font-semibold dark:text-white">
                        {loading ? 'Loading...' : calculateExchangeRate()}
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#141F1F] shadow-sm shadow-[#7DF9FF] text-white p-3 rounded-lg font-semibold">
                    Swap
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='text-center'>
                  <div className='flex justify-center items-center'>
                    <CircleHelp fill='#141F1F' color='#7DF9FF' strokeWidth={1} size="60"/>
                  </div>
                  <p className="mb-4 font-bold text-lg dark:text-white">Confirm Swap</p>
                  <p className="mb-4 text-sm dark:text-gray-300">
                    Are you sure you want to swap {formData.amount} {formData.toCurrency} from your {formData.fromCurrency} wallet?
                  </p>
                  <div className="flex flex-col gap-y-2">
                    <button onClick={handleConfirm} className="bg-[#141F1F] text-sm shadow-sm shadow-[#7DF9FF] font-medium text-white p-3 rounded-lg w-full">Confirm Swap</button>
                    <button onClick={() => setStep(1)} className="bg-[#7DF9FF] text-sm dark:bg-gray-50 font-medium text-[#141f1f] p-3 rounded-lg w-full">Cancel</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='text-center'>
                  <div className='flex justify-center items-center'>
                    <TickCircle variant='Bulk' color='#22C55E' size="60"/>
                  </div>
                  <p className="mb-4 font-bold text-lg dark:text-white">Swap Successful!</p>
                  <p className="mb-4 text-sm dark:text-gray-300">
                    You have successfully swapped {formData.amount} {formData.toCurrency} from your {formData.fromCurrency} wallet.
                  </p>
                  <button onClick={handleClose} className="w-full bg-[#141f1f] text-white p-3 rounded-lg font-semibold">Done</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Swap;
