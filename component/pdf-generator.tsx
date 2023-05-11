import Image from 'next/image'
// import './globals.css'
import React from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
type props = {

  html?: React.MutableRefObject<HTMLDivElement>;

};

const GeneratePdf: React.FC<props> = ({ html }) => {
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.output("dataurlnewwindow");
    doc.save()
  };

  const generateImage = async () => {
    if (document.getElementById('bill')) {
      const image = await toPng(document.getElementById('bill'), { quality: 0.95 });
      const doc = new jsPDF();

      doc.addImage(image, 'JPEG', 5, 22, 200, 160);
      var string = doc.output('datauristring');
      var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
      var x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.close();
      doc.save()
    }

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