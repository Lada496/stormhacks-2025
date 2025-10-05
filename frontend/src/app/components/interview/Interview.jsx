'use client';

import { useEffect, useMemo, useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import styles from './Interview.module.css';
import Image from 'next/image';

export default function Interview(props) {
const  {
    setCurrentView,
} = props;
  const [micMuted, setMicMuted] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
 
  const hookOptions = useMemo(() => ({
    onConnect: () => console.log('[EL] Connected'),
    onDisconnect: (details) => console.log('[EL] Disconnected', details),
    onMessage: (message) => console.log('[EL] Message:', message),
    onError: (error) => console.error('[EL] Error:', error),
    micMuted,
  }), [micMuted]);

  const conversation = useConversation(hookOptions);

  useEffect(() => {
    setIsFormValid(userName.trim() && resumeText.trim() && jobDescription.trim());
  }, [userName, resumeText, jobDescription]);

  // Ensure WS/worklet are torn down when component unmounts or hot-reloads
  useEffect(() => {
    return () => {
      conversation.endSession?.().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartConversation = async () => {
    // Validate required fields
    if (!isFormValid) {
      setError('Please complete all required fields before starting the interview');
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
            user_name: userName,
            resume_text: resumeText,
            job_description: jobDescription,
        },
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      setError('Failed to start conversation. Please try again.');
    }
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
    setCurrentView("home");
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

        {/* Resume Text Section */}
        <div className={styles.uploadSection}>
          <label className={styles.inputLabel}>RESUME TEXT (REQUIRED):</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className={styles.resumeTextarea}
            rows={8}
          />
          {resumeText && (
            <div className={styles.successMessage}>
              ✅ Resume text added successfully!
            </div>
          )}
          {error && <div className={styles.errorMessage}>⚠️ {error}</div>}
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
        </div>
      </div>
    </div>
  );
}