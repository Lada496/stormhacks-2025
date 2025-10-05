'use client';

import { useEffect, useMemo, useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import styles from './Interview.module.css';
import Image from 'next/image';

export default function Interview() {
  const [micMuted, setMicMuted] = useState(false);

  const hookOptions = useMemo(() => ({
    onConnect: () => console.log('[EL] Connected'),
    onDisconnect: (details) => console.log('[EL] Disconnected', details),
    onMessage: (message) => console.log('[EL] Message:', message),
    onError: (error) => console.error('[EL] Error:', error),
    micMuted,
  }), [micMuted]);

  const conversation = useConversation(hookOptions);

  // Ensure WS/worklet are torn down when component unmounts or hot-reloads
  useEffect(() => {
    return () => {
      conversation.endSession?.().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartConversation = async () => {
    try {
      if (conversation.status === 'connected' || conversation.status === 'connecting') {
        console.log('[EL] Session already active or connecting');
        return;
      }
      await conversation.startSession({
        agentId: 'agent_0001k6rp4663f1y8zf4xd378w3hf',
        dynamicVariables: {
            user_name: 'JobQuest Challenger'
        },
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
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
          Get real-time feedback and improve your communication!
        </p>

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
            disabled={conversation.status === 'connected' || conversation.status === 'connecting'}
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