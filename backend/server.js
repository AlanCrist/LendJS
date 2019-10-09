const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//iniciando o app
const app = express();
app.use(express.json());
app.use(cors());

// iniciando o BD
mongoose.connect(
    'mongodb://localhost:27017/mylend',
    { useNewUrlParser: true, useUnifiedTopology: true }
);
requireDir('./src/models');

// rotas
app.use('/', require('./src/routes'));

app.listen(3001);