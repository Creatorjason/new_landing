import Link from 'next/link';

const FeatureSection = () => {
  return (
    <section className="p-4 py-10 md:p-10 text-[#141F1F] relative overflow-hidden">
      <div className="mb-8 space-y-2">
        <div className="w-max text-[#141F1F] dark:text-gray-100 px-10 md:px-16 py-6 bg-custom-gradient-2 hover:rotate-0 transition-all ease-in-out duration-200 rounded-full text-3xl md:text-4xl font-semibold transform rotate-[8deg]">Save on Fees</div>
        <div className="w-max text-[#141F1F] dark:text-gray-100 px-10 md:px-16 py-6 bg-custom-gradient-2 rounded-full text-3xl md:text-4xl font-semibold">Sending</div>
        <div className="w-max text-[#141F1F] dark:text-gray-100 px-10 md:px-16 py-6 bg-custom-gradient-2 rounded-full text-3xl md:text-4xl font-semibold">Money Abroad</div>
      </div>
      <p className="mb-6 text-base max-w-[400px] text-[#333333] dark:text-[#7DF9FF] leading-snug">
        Whether it&apos;s 50 euros or 50,000 dollars, sending money shouldn&apos;t cost the earth. GranulaX lets you transfer money internationally, free from hidden fees.
      </p>
      <Link href="/learn-more" className="inline-block px-8 py-3 bg-[#141F1F] dark:bg-white dark:text-[#141F1F] text-white rounded-full hover:bg-opacity-90 font-semibold text-base">
        Send Money Now
      </Link>
    </section>
  );
};

export default FeatureSection;