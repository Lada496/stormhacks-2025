const { ElevenLabsAPI } = require('elevenlabs');
const elevenLabsConfig = require('../config/elevenLabs');

class ElevenLabsAgent {
  constructor() {
    this.client = new ElevenLabsAPI({
      apiKey: elevenLabsConfig.apiKey
    });
    this.voiceId = elevenLabsConfig.voiceId;
    this.modelId = elevenLabsConfig.modelId;
  }

  async generateSpeech(text, options = {}) {
    try {
      const audio = await this.client.generate({
        voice: options.voiceId || this.voiceId,
        model_id: options.modelId || this.modelId,
        text: text,
        voice_settings: {
          stability: options.stability || 0.5,
          similarity_boost: options.similarityBoost || 0.75,
          style: options.style || 0,
          use_speaker_boost: options.useSpeakerBoost || true
        }
      });

      return audio;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  async getVoices() {
    try {
      const voices = await this.client.voices.getAll();
      return voices;
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }

  async cloneVoice(name, files, description = '') {
    try {
      const voice = await this.client.voices.add({
        name,
        files,
        description
      });
      return voice;
    } catch (error) {
      console.error('Error cloning voice:', error);
      throw error;
    }
  }
}

module.exports = ElevenLabsAgent;