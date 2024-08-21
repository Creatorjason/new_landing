import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-[#141F1F] text-white p-40 mx-10 mb-10 rounded-2xl space-y-8 flex flex-col items-center text-center">
      <h2 className="text-5xl md:text-6xl px-10 font-semibold">
        Achieve financial freedom <br />without borders
      </h2>
      <p className="text-lg md:text-xl mb-6 max-w-3xl">
        We're creating the ultimate way to transfer and manage money globally—
        minimal fees, maximum convenience, and lightning-fast.
      </p>
      <button className="bg-[#7DF9FF] text-[#141F1F] py-3 px-6 rounded-full font-medium">
        Send Money Now
      </button>
    </section>
  );
};

export default CallToAction;