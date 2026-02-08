import React, { useState } from 'react';
import './Certificateuploadpage.css';
import { useForm } from "react-hook-form";
import config from '../config';
import { useNavigate } from "react-router-dom";

const CertificateUploadPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [prevtitle, setitle] = useState("");
  const [previssue, setissue] = useState("");
  const [prevdate, setdate] = useState("");

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'image') {
        setImagePreview(URL.createObjectURL(file));
      } else if (type === 'pdf') {
        setPdfName(file.name);
      }
    }
  };

  const onsubmit = async (newdata) => {
    setLoading(true);
    const formData = new FormData();

    // Append both files correctly
    if (newdata.image && newdata.image[0]) {
      formData.append("image", newdata.image[0]);
    }
    if (newdata.pdf && newdata.pdf[0]) {
      formData.append("pdf", newdata.pdf[0]);
    }

    formData.append("title", newdata.title);
    formData.append("issuer", newdata.issuer);
    formData.append("date", newdata.date);

    try {
      const res = await fetch(`${config.API_BASE_URL}/uploadcert`, {
        method: "POST",
        credentials:'include',
        body: formData,
      });

      const response = await res.json();

      if (response.success) {
        setSuccess(true);
        reset();
        setImagePreview(null);
        setPdfName(null);
        setTimeout(() => navigate('/'), 2000);
      } else {
        alert(response.message || "Upload failed");
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert("An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    reset();
    setImagePreview(null);
    setPdfName(null);
    setitle("");
    setissue("");
    setdate("");
  };

  return (
    <div className="certificate-upload-container">
      <nav className="certificate-navbar">
        <div className="certificate-nav-content">
          <h1 className="certificate-nav-title">📜 Certificate Upload</h1>
        </div>
      </nav>

      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">Add Your Certificate</h2>
          <p className="page-subtitle">Share your achievements with the world</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Uploaded Successfully!</h3>
            <p>Redirecting you home...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onsubmit)} className="certificate-form">
            <div className="upload-section">
              <h3 className="section-title">Upload Files</h3>
              
              <div className="file-upload-container">
                {/* Image Upload */}
                <div className="upload-option">
                  <label htmlFor="certificate-image" className="upload-label">
                    <input
                      type="file"
                      id="certificate-image"
                      accept="image/*"
                      className="file-input"
                      {...register("image", {
                        required: "Image is required",
                        onChange: (e) => handleFileChange(e, 'image')
                      })}
                      disabled={loading}
                    />
                    <div className="upload-placeholder">
                      <span className="upload-icon">📸</span>
                      <p>Upload Image</p>
                    </div>
                  </label>
                  {errors.image && <span className="error-message">{errors.image.message}</span>}
                </div>

                {/* PDF Upload */}
                <div className="upload-option">
                  <label htmlFor="certificate-pdf" className="upload-label">
                    <input
                      type="file"
                      id="certificate-pdf"
                      accept="application/pdf"
                      className="file-input"
                      {...register("pdf", {
                        required: "PDF is required",
                        onChange: (e) => handleFileChange(e, 'pdf')
                      })}
                      disabled={loading}
                    />
                    <div className="upload-placeholder">
                      <span className="upload-icon">📄</span>
                      <p>Upload PDF</p>
                    </div>
                  </label>
                  {errors.pdf && <span className="error-message">{errors.pdf.message}</span>}
                </div>
              </div>

              {/* Previews */}
              <div className="file-preview-section">
                {imagePreview && (
                  <div className="file-preview">
                    <img src={imagePreview} alt="Preview" className="preview-image" />
                    <span className="preview-label">Image Selected</span>
                  </div>
                )}
                {pdfName && (
                  <div className="file-preview">
                    <div className="preview-content pdf">
                      <span>📄</span>
                      <p className="pdf-name">{pdfName}</p>
                    </div>
                    <span className="preview-label">PDF Selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label>Certificate Title *</label>
                <input
                  type="text"
                  placeholder="e.g. React Certification"
                  {...register("title", { required: "Title is required" })}
                  onChange={(e) => setitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Issuer *</label>
                <input
                  type="text"
                  placeholder="e.g. Coursera"
                  {...register("issuer", { required: "Issuer is required" })}
                  onChange={(e) => setissue(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Date Received *</label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  onChange={(e) => setdate(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="button-group">
              <button type="button" onClick={handleClearForm} className="btn btn-secondary" disabled={loading}>
                Clear Form
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
                {loading ? 'Uploading...' : 'Upload Certificate'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default CertificateUploadPage;