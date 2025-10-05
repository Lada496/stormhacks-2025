"use client";

import {useState} from "react";
import styles from "./ResumeReview.module.css";
// ============================================================
// LOADING SCREEN INTEGRATION - Add these imports
// ============================================================
import LoadingScreen from './LoadingScreen';
import {useLoadingProgress} from '../hooks/useLoadingProgress';
// ============================================================

const ResumeReview = ({setUserStats}) => {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [parsedText, setParsedText] = useState(null);
    const [error, setError] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [response, setResponse] = useState("");
    const [show, setShow] = useState(false);

    // ============================================================
    // LOADING SCREEN INTEGRATION - Add these hooks
    // ============================================================
    const [loading, setLoading] = useState(false);
    const {progress, startProgress, completeProgress, resetProgress} = useLoadingProgress();
    // ============================================================

    const callAgent = async (e) => {
        e.preventDefault();
        setError(null);

        // ============================================================
        // LOADING SCREEN INTEGRATION - Start progress animation
        // ============================================================
        setLoading(true);
        startProgress();
        // ============================================================

        try {
            const res = await fetch("/api/call-resume-analyzer-agent", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({resume: parsedText, jobDescription}),
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);

            const data = await res.json();
            setResponse(data);

            // Update user stats if function is provided
            if (setUserStats) {
                setUserStats((prev) => ({
                    ...prev,
                    xp: data.overallScore || 0,
                }));
            }

            setShow(true);
            console.log({data});
        } catch (err) {
            console.error('Error calling agent:', err);
            setError(err.message || "Failed to analyze resume");
        } finally {
            // ============================================================
            // LOADING SCREEN INTEGRATION - Complete progress and hide
            // ============================================================
            await completeProgress();
            setLoading(false);
            // ============================================================
        }
    };

    const handleFileUpload = async (uploadedFile) => {
        if (!uploadedFile) return;

        if (uploadedFile.type !== "application/pdf") {
            setError("Please upload a PDF file");
            return;
        }

        setFile(uploadedFile);
        setIsProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("resume", uploadedFile);

            const response = await fetch("/api/parse-resume", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to parse resume");
            }

            const data = await response.json();
            setParsedText(data.text);

            // Here you can add additional processing with the parsed text
            // For example, send to LLM for analysis
            console.log("Resume parsed successfully:", data.text);
        } catch (err) {
            setError(err.message || "Failed to parse resume");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        handleFileUpload(uploadedFile);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        handleFileUpload(droppedFile);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {/* ============================================================ */}
            {/* LOADING SCREEN INTEGRATION - Show animated loading screen */}
            {/* ============================================================ */}
            {loading && <LoadingScreen progress={progress}/>}
            {/* ============================================================ */}

            {/* Show results if available */}
            {show ? (
                <div className={styles.container}>
                    <div className={styles.uploadSection}>
                        <h2 className={styles.title}>ANALYSIS COMPLETE!</h2>
                        <div className={styles.successMessage}>
                            ✅ Your resume has been analyzed
                        </div>
                        <pre style={{color: '#fff', fontSize: '0.9rem', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
              {JSON.stringify(response, null, 2)}
            </pre>
                        <button
                            className={styles.btn}
                            onClick={() => setShow(false)}
                        >
                            Analyze Another Resume
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.uploadSection}>
                        <h2 className={styles.title}>RESUME REVIEW</h2>
                        <p className={styles.description}>
                            Upload your resume for AI-powered feedback and optimization tips
                        </p>

                        <label
                            htmlFor="resume-upload"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className={styles.dropZone}
                        >
                            {isProcessing ? (
                                <span className={styles.processing}>PROCESSING...</span>
                            ) : file ? (
                                <span className={styles.fileName}>{file.name}</span>
                            ) : (
                                <span className={styles.uploadText}>
                  DRAG & DROP OR CLICK TO UPLOAD
                </span>
                            )}
                            <input
                                id="resume-upload"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                                disabled={isProcessing}
                            />
                        </label>

                        {error && <div className={styles.error}>⚠️ {error}</div>}

                        {parsedText && (
                            <div className={styles.successMessage}>
                                ✅ Resume parsed successfully!
                            </div>
                        )}
                    </div>

                    <div className={styles.uploadSection}>
                        <h2 className={styles.title}>JOB DESCRIPTION</h2>
                        <form className={styles.submitForm} onSubmit={callAgent}>
              <textarea
                  className={styles.textarea}
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
              />
                            <button
                                className={styles.btn}
                                type="submit"
                                disabled={!parsedText || !jobDescription || loading}
                            >
                                {loading ? "Analyzing..." : "Submit!"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ResumeReview;
