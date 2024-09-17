import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardContent from '@/components/dashboard/DashboardContent'
import PeerBankContent from '@/components/dashboard/PeerBankContent'
import VersesContent from '@/components/dashboard/VersesContent'

const TabView = () => {
  const [activeTab, setActiveTab] = useState('regular');

  return (
    <>
      <div className="relative mb-6 inline-flex bg-gray-50 border rounded-full p-1">
        <motion.div
          className="absolute bg-[#141F1F] rounded-full left-0 top-0 h-full w-1/3"
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ 
            left: activeTab === 'regular' ? '0%' : activeTab === 'peerBank' ? '33.333%' : '66.666%', 
          }}
        />

        <button
          className={`relative py-1.5 px-8 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'regular' ? 'text-white' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('regular')}
        >
          Regular
        </button>
        <button
          className={`relative py-1.5 px-8 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'peerBank' ? 'text-white' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('peerBank')}
        >
          Peer Bank
        </button>
        <button
          className={`relative py-1.5 px-8 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'verses' ? 'text-white' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('verses')}
        >
          Verses
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
          ) : activeTab === 'peerBank' ?  (
            <PeerBankView />
          ) : (
            <VersesView />
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

const VersesView = () => (
  <VersesContent />
);

export default TabView;