import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardContent from '@/components/dashboard/DashboardContent'
import PeerBankContent from '@/components/dashboard/PeerBankContent'

const TabView = () => {
  const [activeTab, setActiveTab] = useState('regular');

  return (
    <>
      <div className="relative mb-6 inline-flex bg-gray-50 border rounded-full p-1">
        <motion.div
          className="absolute bg-[#141F1F] rounded-full left-0 top-0 h-full w-1/2"
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ 
            left: activeTab === 'regular' ? '0%' : '50%', 
          }}
        />

        <button
          className={`relative py-1.5 px-10 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'regular' ? 'text-white' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('regular')}
        >
          Regular
        </button>
        <button
          className={`relative py-1.5 px-10 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'peerBank' ? 'text-white' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('peerBank')}
        >
          Peer Bank
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'regular' ? (
            <RegularView />
          ) : (
            <PeerBankView />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const RegularView = () => (
  <DashboardContent />
);

const PeerBankView = () => (
  <PeerBankContent />
);

export default TabView;