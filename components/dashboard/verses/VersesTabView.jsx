import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MyVerseView from './MyVerseView';
import OtherVerses from './OtherVerses';

const VersesTabView = ({ session }) => {
  const [activeTab, setActiveTab] = useState('myVerse');

  return (
    <>
      <div className="relative mb-6 inline-flex bg-gray-50 border overflow-hidden rounded-full p-1">
        <motion.div
          className="absolute bg-[#141F1F] left-0 top-0 h-full w-1/2"
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ 
            left: activeTab === 'myVerse' ? '0%' : '50%', 
          }}
        />

        <button
          className={`relative z-0 py-1.5 px-10 rounded-full text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'myVerse' ? 'text-white' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('myVerse')}
        >
          My Verse
        </button>
        <button
          className={`relative z-0 py-1.5 px-10 rounded-full text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'peerBank' ? 'text-white' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('peerBank')}
        >
          Other Verses
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
          {activeTab === 'myVerse' ? (
            <MyVerse session={session} />
          ) : (
            <PeerBankView session={session} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const MyVerse = ({ session }) => (
  <MyVerseView session={session} />
);

const PeerBankView = ({ session }) => (
  <OtherVerses session={session} />
);

export default VersesTabView;