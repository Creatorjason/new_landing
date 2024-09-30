// components/ServiceGrid.js
import React from 'react';
import { Call, Gift, Flash, TicketStar, Monitor, Drop } from 'iconsax-react';

const ServiceItem = ({ title, icon: Icon }) => (
  <div className="flex items-center justify-between bg-white dark:bg-[#1C2626] rounded-md p-4 px-2.5">
    <span className="text-sm font-medium text-center">{title}</span>
    <div className="p-3 bg-[#141f1f] rounded-full">
      <Icon size={22} variant="Bold" className="text-white" />
    </div>
  </div>
);

const ServiceGrid = () => {
  const services = [
    { title: 'Airtime & Data', icon: Call },
    { title: 'Gift Cards', icon: Gift },
    { title: 'Electricity Bill', icon: Flash },
    { title: 'Vouchers', icon: TicketStar },
    { title: 'TV Subscription', icon: Monitor },
    { title: 'Water Bill', icon: Drop },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {services.map((service, index) => (
        <ServiceItem key={index} {...service} />
      ))}
    </div>
  );
};

export default ServiceGrid;