"use client"

import React, { useState } from 'react';
import { ClipboardText, Clock } from 'iconsax-react';
import VersesTabView from './VersesTabView';
import { useSession } from 'next-auth/react';

const Verses = () => {
  const { data: session } = useSession()

  return (
    <div className="mt-4">
      <VersesTabView session={session} />
    </div>
  );
};

export default Verses;