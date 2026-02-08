import React, { useState } from 'react';
import './Certificateuploadpage.css';
import { useForm } from "react-hook-form";
import config from '../config';
import { useNavigate } from "react-router-dom";

const Projectuploadpage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [prevtitle, setitle] = useState("");
  const [prevdesc, setdesc] = useState("");
  const [prevlink, setlink] = useState("");

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

    formData.append("title", newdata.title);
    formData.append("desc", newdata.desc);
    formData.append("link", newdata.link);

    try {
      const res = await fetch(`${config.API_BASE_URL}/uploadproject`, {
        method: "POST",
        credentials:'include',
        body: formData,
      });

      const response = await res.json();

      if (response.success) {
        setSuccess(true);
        reset();
        setImagePreview(null);
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

  return (
    <div className="certificate-upload-container">
      <nav className="certificate-navbar">
        <div className="certificate-nav-content">
          <h1 className="certificate-nav-title">Project Upload</h1>
        </div>
      </nav>

      <main className="main-content">
        <div className="page-header">
          <h2 className="page-title">Add Your Project</h2>
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
              </div>

              {/* Previews */}
              <div className="file-preview-section">
                {imagePreview && (
                  <div className="file-preview">
                    <img src={imagePreview} alt="Preview" className="preview-image" />
                    <span className="preview-label">Image Selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  placeholder="e.g. React Certification"
                  {...register("title", { required: "Title is required" })}
                  onChange={(e) => setitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Project description *</label>
                <input
                  type="text"
                  placeholder="e.g. Coursera"
                  {...register("desc", { required: "desc is required" })}
                  onChange={(e) => setdesc(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Project Link *</label>
                <input
                  type="text"
                  {...register("link", { required: "projectlink is required" })}
                  onChange={(e) => setlink(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={loading || isSubmitting}>
                {loading ? 'Uploading...' : 'Upload Project'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Projectuploadpage;