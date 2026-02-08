import { useParams } from 'react-router-dom';

const PdfDisplay = () => {
  const {name}=useParams()  
  const pdfPath = `/${name}.pdf`;

  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <object
        data={pdfPath}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
      >
        {/* Fallback content if the PDF fails to load */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h3>Unable to display PDF</h3>
          <p>Your browser doesn't support inline PDFs.</p>
          <a 
            href={pdfPath} 
            download 
            style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Click here to download and view the file
          </a>
        </div>
      </object>
    </div>
  );
};

export default PdfDisplay;