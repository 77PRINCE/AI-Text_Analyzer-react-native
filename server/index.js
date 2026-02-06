require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Default route so you know it's working
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: 'Text is required' });
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'Server misconfiguration: API Key missing' });

  try {
    // 1. First, fetch what models are ACTUALLY available to this key
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await listRes.json();
    const availableModels = data.models ? data.models.map(m => m.name) : [];

    console.log('📋 Available Models:', availableModels);

    // 2. Pick a model logic
    // Try to find a flash model, or pro model, or just the first one
    let targetModel = availableModels.find(m => m.includes('flash') && !m.includes('8b'))
      || availableModels.find(m => m.includes('pro'))
      || availableModels[0]; // Desperation: pick the first one

    // Clean "models/" prefix if present
    if (targetModel) targetModel = targetModel.replace('models/', '');

    // Fallback if list failed
    if (!targetModel) targetModel = 'gemini-1.5-flash';

    console.log(`🤖 Attempting to use model: ${targetModel}`);

    const model = genAI.getGenerativeModel({
      model: targetModel,
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Analyze this text. Return JSON with keys: summary, sentiment, keywords. Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    const jsonResult = JSON.parse(textResponse);
    res.json(jsonResult);

  } catch (error) {
    console.error(`❌ Analysis failed:`, error.message);

    // FETCH MODELS AGAIN TO SHOW USER
    let debugModels = [];
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
      const data = await listRes.json();
      debugModels = data.models ? data.models.map(m => m.name) : ['Fetch failed'];
    } catch (e) { }

    res.status(500).json({
      error: 'AI Error',
      details: error.message,
      debug_available_models: debugModels
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Use Gemini Free Logic: http://localhost:${port}/analyze`);
  // Attempt to show LAN IP
  const nets = require('os').networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`External Access: http://${net.address}:${port}/analyze`);
      }
    }
  }
});
