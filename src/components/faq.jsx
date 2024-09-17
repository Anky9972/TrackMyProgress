import { useState } from 'react';
import { faqs } from '../components/faqdata';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black pt-16 px-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
        <div className="">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-black p-6  shadow-md border-b">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left focus:outline-none"
              >
                <h3 className="text-xl font-semibold text-gray-400 mb-2 flex justify-between items-center">
                  {faq.question}
                  <span className={`transform transition-transform duration-300 rotate-180 ${openIndex === index ? 'rotate-0' : ''}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </span>
                </h3>
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className="text-gray-600 mt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
