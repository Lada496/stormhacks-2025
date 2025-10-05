const dotenv = require('dotenv');
dotenv.config();

const elevenLabsConfig = {
  apiKey: process.env.ELEVENLABS_API_KEY,
  voiceId: process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB', // Default voice
  modelId: process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2',
  baseUrl: 'https://api.elevenlabs.io/v1'
};

module.exports = elevenLabsConfig;