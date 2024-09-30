import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is GranularX, and how does it benefit clients?",
    answer: "GranularX is a technology solution that helps clients optimize their processes. It benefits clients by improving efficiency and productivity."
  },
  {
    question: "Who are soft servants?",
    answer: "Soft servants are AI assistants designed to help with various tasks and provide information to users."
  },
  {
    question: "Can I trust the information provided on GranularX?",
    answer: "GranularX strives to provide accurate and reliable information. However, it's always recommended to verify critical information from multiple sources."
  },
  {
    question: "How do I access other people's verses?",
    answer: "The ability to access other people's verses depends on the platform and privacy settings. Please refer to the specific platform's guidelines for more information."
  },
  {
    question: "What role does Soft Servants play?",
    answer: "Soft Servants play a supportive role, assisting users with various tasks, answering questions, and providing information as needed."
  },
  {
    question: "Can other clients send me a message on GranularX?",
    answer: "The messaging capabilities on GranularX depend on the platform's features. Check the GranularX user guide or contact support for specific information about messaging between clients."
  }
];

const FAQs = () => {
  return (
    <section className="p-4 md:p-8 pb-16 flex flex-col lg:flex-row lg:gap-x-10 lg:justify-between">
      <div className="max-w-sm md:max-w-lg lg:w-1/3 pl-4 md:pl-0 mb-8 lg:mb-0">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-6">FAQs</h2>
        <p className="text-sm md:text-base">
          Get quick answers to common questions about our tech solutions. Need more help? Contact our support team for personalized assistance.
        </p>
      </div>
      <div className='w-full lg:w-2/3 dark:text-white'>
        <Accordion type="single" collapsible className="w-full border-b border-[#E6E6E6] space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="flex justify-between p-4 text-sm md:text-base font-medium text-left text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 text-sm md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;