const express = require('express')
require('dotenv').config()
const app = express()
const {GoogleGenAI} = require('@google/genai')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const genAi = new GoogleGenAI({apiKey: process.env.API_KEY})

app.get('/api/test', (req, res) => {
    res.json({message: 'API is working'})
})

app.post('/api/chat', async (req, res) => {
    try {
        
        const response = await genAi.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: req.body
        });
        console.log(response.text);

    } catch (error) {
        console.error('Error generating response:', error.message || error)
        res.status(500).json({ error: 'Failed to generate response', details: error.message })
    }
})

app.listen(process.env.PORT || 3000, (err) => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)

    if (err) {
        console.error('Error starting server:', err)
    }
})