
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 3000; // Ensure this port is available
const OPENAI_API_KEY = 'sk-proj-Ij7W6VoOAW9VrCn9WDCfT3BlbkFJyX5ZMZYJQ3Os2fvVBSAv'; // Replace with your actual API key

app.use(bodyParser.json());

// Define a simple GET route for the root endpoint
app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
});

// Define a POST route for the /chat endpoint
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Example data for product recommendations
const productData = [
    {
        name: 'Floral Maxi Sundress',
        description: 'This dress features a vibrant floral print with a flowy silhouette, ideal for summer days.',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        name: 'Khaki Cargo Pants',
        description: 'These pants feature a relaxed fit with cargo pockets, perfect for a laid-back vibe.',
        sizes: ['S', 'M', 'L', 'XL']
    }
    // Add more product data as needed
];

// Handle POST request to /chat endpoint
app.post('/chat', (req, res) => {
    const message = req.body.message.toLowerCase().trim();
    let reply = '';

    // Example logic for different user queries
    if (message.includes('summer styling')) {
        reply = "Summer calls for light and breezy outfits. How about a floral sundress paired with strappy sandals?";
    } else if (message.includes('floral sundresses')) {
        reply = JSON.stringify(productData.filter(product => product.name.toLowerCase().includes('floral')));
    } else {
        reply = "Sorry, I didn't quite catch that. Can you please ask again?";
    }

    res.json({ reply: reply });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

