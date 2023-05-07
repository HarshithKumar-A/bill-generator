import Image from 'next/image'
// import './globals.css'
import React from "react";
import { jsPDF,HTMLOptionImage } from "jspdf";
import { toPng,toCanvas } from "html-to-image";
type props = {

  html?: React.MutableRefObject<HTMLDivElement>;

};

const GeneratePdf: React.FC<props> = ({ html }) => {
  const generatePdf = () => {
      const doc = new jsPDF();
      doc.output("dataurlnewwindow");  
      doc.save()
  };

  const generateImage=async ()=>{
    const image = await toPng(document.getElementById('bill'),{quality:0.95});
    const doc = new jsPDF();

      doc.addImage(image,'JPEG',5,22,200,160);
      doc.save();


  }
  return (

    <div className="button-container">
        <button onClick={generateImage}>
        Get PDF using image
      </button>
      {/* <button onClick={generatePdf}>
        Get PDF as text
      </button> */}
    </div>

  );
};

export default GeneratePdf;