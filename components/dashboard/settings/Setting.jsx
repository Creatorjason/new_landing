"use client"

import React, { useState } from 'react';
import ProfileSetting from './ProfileSetting';
import MailboxSetting from './MailboxSetting';
import VersesSetting from './VersesSetting';
import WalletSetting from './WalletSetting';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogoutCurve } from 'iconsax-react';

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabContent = {
    profile: (
      <ProfileSetting />
    ),
    verses: (
      <VersesSetting />
    ),
    mailbox: (
      <MailboxSetting />
    ),
    wallet: (
      <WalletSetting />
    ),
  };

  return (
    <div className="bg-white dark:bg-[#1C2626] p-6 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button className="text-red-600 hover:text-red-800 text-sm flex items-center gap-x-1 font-medium"><LogoutCurve size="20"/> <span>Log Out</span></button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex justify-between">
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="verses" className="flex-1">Verses</TabsTrigger>
          <TabsTrigger value="mailbox" className="flex-1">Mailbox</TabsTrigger>
          <TabsTrigger value="wallet" className="flex-1">Wallet</TabsTrigger>
        </TabsList>

        {Object.entries(tabContent).map(([key, content]) => (
          <TabsContent key={key} value={key}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Setting;