"use client"

import React, { useState } from 'react';
import { ClipboardText, Clock } from 'iconsax-react';
import VersesTabView from './VersesTabView';

const Verses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mt-4">
      <VersesTabView />
    </div>
  );
};

export default Verses;