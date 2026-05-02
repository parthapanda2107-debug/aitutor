const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock AI endpoint to handle learning logic
app.post('/api/learn', (req, res) => {
    const { topic, level, action } = req.body;
    
    // In a production app, you would integrate OpenAI or Gemini APIs here.
    // We are simulating an adaptive response.
    
    setTimeout(() => {
        if (action === 'start') {
            res.json({
                success: true,
                data: {
                    goal: `Mastering ${topic || 'New Concept'}`,
                    currentLevel: level || 'Beginner',
                    content: `Here is a step-by-step introduction to ${topic}. We'll start simple.`,
                    visual: `Imagine ${topic} as a structured process...`,
                    practice: `What is the core principle of ${topic}?`
                }
            });
        } else if (action === 'answer') {
            // Simulate answer checking (Adaptive difficulty)
            const isCorrect = Math.random() > 0.5; // Simulate evaluation
            res.json({
                success: true,
                correct: isCorrect,
                feedback: isCorrect ? 
                    "Excellent! You grasped the concept perfectly. Let's move to something harder." : 
                    "Not quite, but you're close! Let's review the visual example again.",
                nextStep: isCorrect ? "Advanced Topic" : "Review Basics"
            });
        }
    }, 1500); // Simulate network delay / AI processing
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
