const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config();
const cors = require('cors');
const userData = require('./data/userData')

app.get('/', (req, res) => {
    res.send('API is running..');
});

app.get('/api/userData', (req, res) => {
    res.json(userData)
})

app.get('/api/userData/:id', (req, res) => {
    const data = userData.find((n) => n.id === req.params.id);
    res.send(data);
})

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))