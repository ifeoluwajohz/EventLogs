import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is TheEvent?",
    answer:
      "TheEvent is a modern ticket booking platform that allows users to discover, book, and manage tickets for various events effortlessly.",
  },
  {
    question: "Who can use TheEvent?",
    answer:
      "Anyone looking to attend or host an event can use TheEvent. Whether you're an individual looking for entertainment or an organizer hosting conferences, concerts, or meetups, TheEvent is designed to simplify your experience.",
  },
  {
    question: "Is TheEvent free to use?",
    answer:
      "Yes! Browsing events and creating an account is completely free. However, ticket prices depend on the event organizers, and service fees may apply for transactions.",
  },
  {
    question: "How do I book a ticket?",
    answer:
      "1. Browse available events.\n2. Select your desired event and ticket category.\n3. Proceed to checkout and complete the payment.\n4. Receive your ticket confirmation via email and in your dashboard.",
  },
  {
    question: "How will I receive my ticket?",
    answer:
      "Tickets will be emailed to you immediately after purchase. You can also access them anytime from your account dashboard.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              className="w-full text-left flex justify-between items-center py-4 px-3 bg-blue-50 hover:bg-blue-200 rounded-md transition duration-200 ease-in-out"
            >
              <span className="text-lg font-medium">{item.question}</span>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 p-3" : "max-h-0"
              }`}
            >
              <p className="text-gray-700 whitespace-pre-line">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
