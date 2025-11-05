
"use client";

import React, { useState } from 'react';
import Script from 'next/script';

const PDFGenerator = () => {
  const [notify, setNotify] = useState(false);

  const handleDownload = () => {
    const element = document.getElementById('resume-content');
    const webhookUrl = 'https://webhook.site/#!/a0c4b2d7-1b9e-4c1e-9a4b-7d7d7d7d7d7d/a8e7b7b0-c5a8-4f3b-8b7c-7d7d7d7d7d7d/1'; // Replace with your actual webhook URL

    const opt = {
      margin:       0.5,
      filename:     'richknowles_resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // @ts-ignore
    html2pdf().from(element).set(opt).save();

    if (notify) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Someone downloaded your resume!',
          timestamp: new Date().toISOString(),
        }),
      });
    }
  };

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" />
      <div className="pdf-generator fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download as PDF
        </button>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notify"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="notify" className="text-sm text-gray-400">
            Notify Rich you downloaded his resume?
          </label>
        </div>
        <div className="buy-me-a-coffee">
          <a href="https://www.buymeacoffee.com/richknowles" target="_blank" rel="noopener noreferrer">
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=richknowles&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
          </a>
        </div>
      </div>
    </>
  );
};

export default PDFGenerator;
