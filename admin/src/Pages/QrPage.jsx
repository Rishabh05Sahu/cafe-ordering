import React, { useState } from 'react';
import logo from '../assets/logo.png';
import Sidebar from '../Components/Sidebar.jsx';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const QrPage = () => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`;
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrLinks, setQrLinks] = useState([]);

  const handleGenerateQr = async () => {
    if (!number || number <= 0) {
      setMessage('Please enter a valid number!');
      return;
    }

    try {
      const url = `${backendUrl}/table/generate-tables`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numberOfTables: number }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR codes');
      }

      const data = await response.json();

      if (data.success) {
        setQrLinks(data.tables);
        setMessage('QR codes generated successfully!');
      } else {
        setMessage(data.message || 'Failed to generate QR codes');
      }
    } catch (error) {
      console.error('Error generating QR codes:', error);
      setMessage('An error occurred while generating QR codes.');
    }
  };

  const handleDownloadPdf = async () => {
    console.log("pdf")
    const pdf = new jsPDF();
    let y = 10; // Initial Y position for content in PDF

    pdf.setFontSize(16);
    pdf.text('QR Codes for Tables', 10, y);
    y += 10;

    for (const link of qrLinks) {
      // Add seat number
      pdf.setFontSize(12);
      pdf.text(`Seat No: ${link.seatNo}`, 10, y);
      y += 10;

      // Convert QR code to image and add to PDF
      const qrImage = await html2canvas(document.querySelector(`#qr-${link.seatNo}`));
      const qrDataUrl = qrImage.toDataURL('image/png');
      pdf.addImage(qrDataUrl, 'PNG', 10, y, 50, 50);
      y += 60;

      // Add link text
      pdf.text(`Link: ${link.qrLink}`, 10, y);
      y += 20;

      // Add page if content exceeds limit
      if (y > 270) {
        pdf.addPage();
        y = 10;
      }
    }

    pdf.save('QR_Codes.pdf');
  };

  return (
    <div className="bg-yellow-100 h-screen flex-col">
      <div className="flex items-center justify-between">
        <Sidebar />
        <h1 className="text-4xl">Generate QR</h1>
        <img
          className="h-24 rounded-full border-4 border-black mt-5 mr-7"
          src={logo}
          alt="Logo"
        />
      </div>

      <div className="flex flex-col items-center mt-5">
        <TextField
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number of seats"
          id="outlined-number"
          label="Number"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Button
          onClick={handleGenerateQr}
          variant="contained"
          className="mt-5"
        >
          Generate QR Codes
        </Button>

        {message && <p className="mt-3">{message}</p>}

        <div className="qr-grid mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-2/3 h-96 overflow-y-auto">
          {qrLinks.map((link) => (
            <div
              key={link.seatNo}
              id={`qr-${link.seatNo}`} // Add ID for capturing QR code
              className="border p-4 rounded shadow-md bg-white flex flex-col items-center"
            >
              <p>Seat No: {link.seatNo}</p>
              <img
                src={link.qrCode}
                alt={`QR Code for seat ${link.seatNo}`}
                className="mt-2"
              />
              <a
                href={link.qrLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2"
              >
                Open Link
              </a>
            </div>
          ))}
        </div>

        {qrLinks.length > 0 && (
          <Button
            onClick={handleDownloadPdf}
            variant="contained"
            className="mt-5"
          >
            Download PDF
          </Button>
        )}
      </div>
    </div>
  );
};

export default QrPage;
