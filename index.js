const dotenv =              require('dotenv');
const express =             require('express');
const session =             require('express-session');
const expressHandlebars =   require('express-handlebars');
const mongoose  =           require('mongoose');
const passport =            require('passport');
const localStrategy =       require('passport-local').Strategy;
const bcrypt =              require('bcrypt');
const app =                 express();
dotenv.config();
const cors =                require('cors');
const userData =            require('./data/userData');
const connect = require('passport/lib/framework/connect');
const connectDb = require('./config/db');

mongoose.connect
connectDb()


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