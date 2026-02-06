require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('Fetching available models...');

    try {
        // There isn't a direct "listModels" on the instance in some SDK versions,
        // but we can try a basic generation to see the error or check documentation.
        // Actually, checking the error message is the best clue we have: "Call ListModels to see...".
        // The SDK exposes it usually via the API client directly, but let's try a safe "gemini-pro" ping first.

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log('✅ gemini-pro is working!');
        console.log(result.response.text());
    } catch (error) {
        console.error('❌ gemini-pro failed:', error.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log('✅ gemini-1.5-flash is working!');
        console.log(result.response.text());
    } catch (error) {
        console.error('❌ gemini-1.5-flash failed:', error.message);
    }
}

listModels();
