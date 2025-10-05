import React, { useState } from 'react';

const ResumeReview = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(uploadedFile);
        } else {
            alert('Please upload a valid PDF or DOCX file.');
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(droppedFile);
        } else {
            alert('Please upload a valid PDF or DOCX file.');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Resume Review Quest</h1>
            <h3>Upload your resume for AI-powered feedback!</h3>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    margin: '20px auto',
                    width: '300px',
                    height: '150px',
                    border: '2px dashed #ccc',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                }}
            >
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    {file ? file.name : 'Drag and drop your resume here or click to upload'}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

export default ResumeReview;