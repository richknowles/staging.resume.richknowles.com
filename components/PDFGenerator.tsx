
"use client";

import React, { useState } from 'react';
import Script from 'next/script';

const PDFGenerator = () => {
  const [notify, setNotify] = useState(true); // Default to opted-in

  const handleDownload = async () => {
    // Open /print in a hidden iframe to capture
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.width = '8.5in'; // Letter width
    iframe.style.height = '11in'; // Initial height, will expand
    document.body.appendChild(iframe);

    iframe.src = '/print';

    // Wait for iframe to load
    await new Promise((resolve) => {
      iframe.onload = resolve;
    });

    // Wait for content to render
    await new Promise(resolve => setTimeout(resolve, 2000));

    const element = iframe.contentDocument?.body;
    if (!element) {
      document.body.removeChild(iframe);
      return;
    }

    // Get the actual content height to ensure we capture everything
    const contentHeight = element.scrollHeight;
    iframe.style.height = contentHeight + 'px';

    // Wait a moment for resize to take effect
    await new Promise(resolve => setTimeout(resolve, 500));

    const opt = {
      margin:       0.5,
      filename:     'richknowles_resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 816, // 8.5in at 96 DPI
        windowHeight: contentHeight
      },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'] }
    };

    // @ts-expect-error - html2pdf is loaded via CDN script
    html2pdf().from(element).set(opt).save().then(() => {
      // Clean up iframe
      document.body.removeChild(iframe);
    });

    // Send notification if opted in
    if (notify) {
      try {
        // Get IP and location info
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        const locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        const locationData = await locationResponse.json();

        const timestamp = new Date().toISOString();
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

        // Also send to webhook for detailed logging
        const webhookUrl = 'https://webhook.site/a0c4b2d7-1b9e-4c1e-9a4b-7d7d7d7d7d7d';
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Someone downloaded your resume!',
            timestamp: timestamp,
            ip: ipData.ip,
            location: {
              city: locationData.city,
              region: locationData.region,
              country: locationData.country_name,
              timezone: locationData.timezone
            },
            userAgent: navigator.userAgent
          }),
        });
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
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
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=richknowles&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy me a coffee" />
          </a>
        </div>
      </div>
    </>
  );
};

export default PDFGenerator;
