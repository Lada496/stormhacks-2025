'use client';

import { useEffect, useMemo, useState } from 'react';
import { useConversation } from '@elevenlabs/react';

export default function VoiceGenerator() {
  const [text, setText] = useState('');
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
            user_name: 'Shit darling'
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
      // ensure the input worklet stops sending after close
      setMicMuted(true);
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  };

  const toggleMic = () => {
    setMicMuted((prev) => !prev);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Eleven Labs Voice Conversation
      </h2>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-medium text-blue-800 mb-2">Voice Conversation:</h3>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. Click "Start Conversation" to begin</li>
          <li>2. Speak naturally - the AI will respond with voice</li>
          <li>3. Use the mic toggle to mute/unmute yourself</li>
          <li>4. Click "End Conversation" when finished</li>
        </ol>
      </div>

      {/* Status Display */}
      <div className="mb-4 p-3 bg-gray-100 rounded-md">
        <p className="text-sm text-gray-600">
          Status: <span className="font-medium">{conversation.status}</span>
        </p>
        <p className="text-sm text-gray-600">
          Speaking: <span className="font-medium">{conversation.isSpeaking ? 'Yes' : 'No'}</span>
        </p>
        <p className="text-sm text-gray-600">
          Mic Muted: <span className="font-medium">{micMuted ? 'Yes' : 'No'}</span>
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleStartConversation}
          disabled={conversation.status === 'connected' || conversation.status === 'connecting'}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
            conversation.status === 'connected' || conversation.status === 'connecting'
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {conversation.status === 'connecting' ? 'Connecting…' : 'Start Conversation'}
        </button>
        
        <button
          onClick={handleEndConversation}
          disabled={conversation.status === 'disconnected'}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
            conversation.status === 'disconnected'
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          End Conversation
        </button>
        
        <button
          onClick={toggleMic}
          disabled={conversation.status !== 'connected'}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
            conversation.status !== 'connected'
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : micMuted
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {micMuted ? 'Unmute Mic' : 'Mute Mic'}
        </button>
      </div>
    </div>
  );
}