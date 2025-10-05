const express = require('express');
const ElevenLabsAgent = require('../agents/elevenLabsAgent');

const router = express.Router();
const agent = new ElevenLabsAgent();

// Generate speech from text
router.post('/generate-speech', async (req, res) => {
  try {
    const { text, voiceId, modelId, voiceSettings } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const options = {
      voiceId,
      modelId,
      ...voiceSettings
    };

    const audio = await agent.generateSpeech(text, options);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="speech.mp3"'
    });
    
    res.send(audio);
  } catch (error) {
    console.error('Error in generate-speech:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

// Get available voices
router.get('/voices', async (req, res) => {
  try {
    const voices = await agent.getVoices();
    res.json(voices);
  } catch (error) {
    console.error('Error in get voices:', error);
    res.status(500).json({ error: 'Failed to fetch voices' });
  }
});

// Clone a voice
router.post('/clone-voice', async (req, res) => {
  try {
    const { name, files, description } = req.body;

    if (!name || !files) {
      return res.status(400).json({ error: 'Name and files are required' });
    }

    const voice = await agent.cloneVoice(name, files, description);
    res.json(voice);
  } catch (error) {
    console.error('Error in clone voice:', error);
    res.status(500).json({ error: 'Failed to clone voice' });
  }
});

module.exports = router;