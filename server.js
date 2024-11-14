const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5001;

// backend server storage for games
const games = {};
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// backend api to save game
app.post('/api/save-game', (req, res) => {
    const { gameId, pieces } = req.body;
    if (!gameId || !pieces) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    games[gameId] = pieces;
    res.json({ message: 'Game saved successfully!' });
});

// backend api to load game
app.get('/api/get-game/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    if (games[gameId]) {
        res.json({ pieces: games[gameId] });
    } else {
        res.status(404).json({ error: 'Game not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
