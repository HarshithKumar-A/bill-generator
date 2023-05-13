import Image from 'next/image'
// import './globals.css'
import React from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
import { FaRegFilePdf, FaRegFileImage } from "react-icons/fa";
type props = {

  html?: React.MutableRefObject<HTMLDivElement>;

};

const GeneratePdf: React.FC<props> = ({ html }) => {
  const generatePdf = () => {
    const doc = new jsPDF(
    );
    doc.output("dataurlnewwindow");
    doc.save()
  };


  const generateImage = async () => {
    const billElement = document.getElementById('bill');
    if (billElement) {
      const image = await toPng(billElement, { quality: 0.95, width: 650, height: billElement.offsetHeight });
      const link = document.createElement('a');
      link.download = 'my-image.png';
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  const downloadPdf = async () => {
    const billElement = document.getElementById('bill');
    if (billElement) {
      const image = await toPng(billElement, { quality: 0.95, width: 650, height: billElement.offsetHeight });
      const doc = new jsPDF('p', 'pt', [650, billElement.offsetHeight]);
      doc.addImage(image, 'JPEG', 0, 0, 650, billElement.offsetHeight);
      doc.save('bill.pdf');
    }
  };
  return (
    <>
      <button className='p-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded h-14 w-1/2 m-4 flex items-center gap-0' onClick={downloadPdf}>
        <FaRegFilePdf />
        Download PDF
      </button>
      <button className='p-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded h-14 w-1/2 m-4 flex items-center gap-0' onClick={generateImage}>
        <FaRegFileImage />
        Download Image
      </button>
    </>


  );
};

export default GeneratePdf;