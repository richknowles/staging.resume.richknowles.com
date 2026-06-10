"use client";

import React, { useState } from 'react';

const PDFGenerator = () => {
  const [notify, setNotify] = useState(true); // Default to opted-in

  const handleDownload = async () => {
    // Serve the canonical one-page resume PDF directly — no client-side rendering
    const link = document.createElement('a');
    link.href = '/richknowles_resume.pdf';
    link.download = 'richknowles_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Send notification if opted in
    if (notify) {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locationData = await locationResponse.json();

        const location = `${locationData.city}, ${locationData.region}, ${locationData.country_name}`;

        // Send to ntfy.sh for instant terminal/mobile notifications
        await fetch('https://ntfy.sh/richknowles-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            'Title': '📄 Resume Downloaded!',
            'Priority': 'high',
            'Tags': 'briefcase,earth_americas'
          },
          body: `Location: ${location}\nIP: ${ipData.ip}\nTime: ${new Date().toLocaleString()}`
        });
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    }
  };

  return (
    <>
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
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=richknowles&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy me a coffee" />
          </a>
        </div>
      </div>
    </>
  );
};

export default PDFGenerator;
