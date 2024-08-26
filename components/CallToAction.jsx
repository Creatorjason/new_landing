import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-[#141F1F] dark:bg-[#1C2626] text-white p-6 py-20 md:p-40 mb-16 rounded-2xl space-y-8 flex flex-col items-center text-center">
      <h2 className="text-3xl md:text-6xl text-center font-semibold">
        Achieve financial freedom without borders
      </h2>
      <p className="text-xs md:text-xl mb-6 max-w-3xl">
        We&apos;re creating the ultimate way to transfer and manage money globally —
        minimal fees, maximum convenience, and lightning-fast.
      </p>
      <button className="bg-[#7DF9FF] text-[#141F1F] dark:bg-white dark:text-[#1C2626] py-3 px-6 rounded-full font-medium hover:bg-opacity-90 transition duration-200">
        Learn about our mission
      </button>
    </section>
  );
};

export default CallToAction;