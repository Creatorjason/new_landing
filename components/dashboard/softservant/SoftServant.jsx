"use client"

import React from 'react';
import { Chart21, Speedometer, Data, Cloud, SearchNormal1 } from 'iconsax-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const PowerCard = ({ icon, title, description, gradient, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`relative z-0 ${index < 2 ? 'mb-4' : ''}`}
    style={{
      transform: `translate(${index % 2 === 0 ? '-4px' : '4px'}, ${index < 2 ? '-4px' : '4px'})`,
    }}
  >
    <Card className={`${gradient} border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-opacity-10`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {icon}
          <Button variant="outline" size="sm" className='transition-all ease-in-out duration-300 border border-[#141F1F] dark:border-gray-50 hover:bg-[#141f1f] hover:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-[#141f1f]'>Activate</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const PowerSection = ({ title, description, powers }) => (
  <section className="mb-16">
    <motion.h2 
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="text-2xl font-semibold mb-4"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="opacity-80 mb-8"
    >
      {description}
    </motion.p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      {powers.map((power, index) => (
        <PowerCard key={index} {...power} index={index} />
      ))}
    </div>
  </section>
);

const SoftServant = () => {
  const powers = [
    {
      icon: <Chart21 size={24} variant="Bold" />,
      title: "Predictive Insights",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat nullam consectetur placerat pellentesque ut massa volutpat at.",
      gradient: "bg-gradient-to-br from-yellow-400 to-transparent dark:from-yellow-600"
    },
    {
      icon: <Speedometer size={24} variant="Bold" />,
      title: "Fastest Speed",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat nullam consectetur placerat pellentesque ut massa volutpat at.",
      gradient: "bg-gradient-to-br from-blue-400 to-transparent dark:from-blue-600"
    },
    {
      icon: <Data size={24} variant="Bold" />,
      title: "Filtered Data",
      description: "Eleifend nullam consectetur placerat pellentesque ut massa volutpat at. Diam premium orci dui sagittis. Nomen quisque elit amet, consectetur elit.",
      gradient: "bg-gradient-to-br from-green-400 to-transparent dark:from-green-600"
    },
    {
      icon: <Cloud size={24} variant="Bold" />,
      title: "Everything in Cloud",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat nullam consectetur placerat pellentesque ut massa volutpat at.",
      gradient: "bg-gradient-to-br from-pink-400 to-transparent dark:from-pink-600"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 px-2 md:p-4 transition-colors duration-300"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-extrabold mb-2 md:text-center"
      >
        Powers
      </motion.h1>
      <motion.p 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="opacity-80 mb-6 md:text-center mx-auto md:max-w-2xl"
      >
        Discover and create custom versions of soft servants that combine instructions,
        extra knowledge, and any combination of skills.
      </motion.p>

      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative mb-12"
      >
        <SearchNormal1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600" size={20} />
        <Input className="pl-10" placeholder="Search Verse" />
      </motion.div>

      <PowerSection 
        title="Free" 
        description="Free access to all these superpowers" 
        powers={powers} 
      />

      <PowerSection 
        title="Paid" 
        description="Make payment to get access to all these superpowers" 
        powers={powers} 
      />
    </motion.div>
  );
};

export default SoftServant;