'use client';

import { useEffect, useMemo, useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import styles from './Interview.module.css';
import Image from 'next/image';

export default function Interview() {
  const [micMuted, setMicMuted] = useState(false);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedText, setParsedText] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);
 
  const hookOptions = useMemo(() => ({
    onConnect: () => console.log('[EL] Connected'),
    onDisconnect: (details) => console.log('[EL] Disconnected', details),
    onMessage: (message) => console.log('[EL] Message:', message),
    onError: (error) => console.error('[EL] Error:', error),
    micMuted,
  }), [micMuted]);

  const conversation = useConversation(hookOptions);

  useEffect(() => {
    setAllFieldsCompleted(userName && userName.trim() && jobDescription && jobDescription.trim() && file);
  }, [userName, file, jobDescription]);

  const isFormValid = userName && userName.trim() !== '';

  // Ensure WS/worklet are torn down when component unmounts or hot-reloads
  useEffect(() => {
    return () => {
      conversation.endSession?.().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartConversation = async () => {
    // Validate required fields
    if (!allFieldsCompleted) {
      setError('Please enter your name before starting the interview');
      return;
    }

    try {
      if (conversation.status === 'connected' || conversation.status === 'connecting') {
        console.log('[EL] Session already active or connecting');
        return;
      }
      
      setError(null); // Clear any previous errors
      
      await conversation.startSession({
        agentId: 'agent_0001k6rp4663f1y8zf4xd378w3hf',
        dynamicVariables: {
            user_name: userName || 'JobQuest Challenger',
            resume_text: parsedText || '',
            job_description: jobDescription || ''
        },
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      setError('Failed to start conversation. Please try again.');
    }
  };

  const handleFileUpload = async (uploadedFile) => {
    if (!uploadedFile) return;

    if (uploadedFile.type !== "application/pdf" && uploadedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setError("Please upload a PDF or DOCX file");
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

  const handleEndConversation = async () => {
    try {
      if (conversation.status !== 'disconnected') {
        await conversation.endSession();
      }
      setMicMuted(true);
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  };

  const toggleMic = () => {
    setMicMuted((prev) => !prev);
  };

  const handleBackToMenu = () => {
    // Navigate back to main menu
    
  };

  const handleViewResults = () => {
    // Navigate to results page
   
  };

  return (
    <div className={styles.card}>
      <Image
        src="/assets/cards/card-purple.svg"
        alt=""
        fill
        className={styles.cardBackground}
      />

      <div className={styles.cardContent}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Image
              src="/assets/iconslots/iconslot-purple.svg"
              alt=""
              fill
              className={styles.iconSlot}
            />
            <div className={styles.micIcon}>🎤</div>
          </div>

          <div className={styles.statusBadge}>
            <Image
              src="/assets/badge/xp-slot.svg"
              alt=""
              fill
              className={styles.statusSlot}
            />
            <span className={styles.statusText}>
              {conversation.status.toUpperCase()}
            </span>
          </div>
        </div>

        <h2 className={styles.title}>VOICE INTERVIEW TRAINER</h2>
        <p className={styles.description}>
          Practice your interview skills with AI-powered voice conversations. 
          Upload your resume and job description for personalized questions!
        </p>

        {/* Name Input Section */}
        <div className={styles.nameSection}>
          <label className={styles.inputLabel}>YOUR NAME (REQUIRED):</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name..."
            className={styles.nameInput}
          />
        </div>

        {/* Resume Upload Section */}
        <div className={styles.uploadSection}>
          <label className={styles.inputLabel}>RESUME UPLOAD (REQUIRED):</label>
          <div
            className={styles.dropZone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('resume-upload').click()}
          >
            {isProcessing ? (
              <div className={styles.processingText}>PROCESSING...</div>
            ) : file ? (
              <div className={styles.fileName}>✓ {file.name}</div>
            ) : (
              <div className={styles.uploadText}>
                <div className={styles.uploadIcon}>📎</div>
                Click to upload or drag & drop your resume
                <div className={styles.uploadSubtext}>PDF or DOCX files only</div>
              </div>
            )}
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              disabled={isProcessing}
            />
          </div>
          {error && <div className={styles.errorMessage}>⚠️ {error}</div>}
          {parsedText && (
            <div className={styles.successMessage}>
              ✅ Resume parsed successfully!
            </div>
          )}
        </div>

        {/* Job Description Section */}
        <div className={styles.jobDescSection}>
          <label className={styles.inputLabel}>JOB DESCRIPTION (REQUIRED):</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here for tailored interview questions..."
            className={styles.jobDescTextarea}
            rows={3}
          />
        </div>

        <div className={styles.statusDisplay}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>SPEAKING:</span>
            <span className={styles.statusValue}>
              {conversation.isSpeaking ? 'YES' : 'NO'}
            </span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>MIC:</span>
            <span className={styles.statusValue}>
              {micMuted ? 'MUTED' : 'ACTIVE'}
            </span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.actionButton}
            onClick={handleStartConversation}
            disabled={conversation.status === 'connected' || conversation.status === 'connecting' || !isFormValid}
          >
            <Image
              src="/assets/buttons/button-green.svg"
              alt=""
              fill
              className={styles.buttonBackground}
            />
            <span className={styles.buttonText}>
              {conversation.status === 'connecting' ? 'CONNECTING...' : 'START INTERVIEW'}
            </span>
          </button>

          <button 
            className={styles.actionButton}
            onClick={handleEndConversation}
            disabled={conversation.status === 'disconnected'}
          >
            <Image
              src="/assets/buttons/button-pink.svg"
              alt=""
              fill
              className={styles.buttonBackground}
            />
            <span className={styles.buttonText}>END INTERVIEW</span>
          </button>

          <button 
            className={styles.actionButton}
            onClick={toggleMic}
            disabled={conversation.status !== 'connected'}
          >
            <Image
              src="/assets/buttons/button-blue.svg"
              alt=""
              fill
              className={styles.buttonBackground}
            />
            <span className={styles.buttonText}>
              {micMuted ? 'UNMUTE MIC' : 'MUTE MIC'}
            </span>
          </button>

          {/* Navigation buttons */}
          <div className={styles.navigationButtons}>
            <button 
              className={styles.actionButton}
              onClick={handleBackToMenu}
            >
              <Image
                src="/assets/buttons/button-orange.svg"
                alt=""
                fill
                className={styles.buttonBackground}
              />
              <span className={styles.buttonText}>BACK TO MENU</span>
            </button>

            <button 
              className={styles.actionButton}
              onClick={handleViewResults}
              disabled={conversation.status === 'connected' || conversation.status === 'connecting'}
            >
              <Image
                src="/assets/buttons/button-purple.svg"
                alt=""
                fill
                className={styles.buttonBackground}
              />
              <span className={styles.buttonText}>VIEW RESULTS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}