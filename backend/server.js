require('dotenv').config();
const express = require ('express');
const DBConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routes');

//installer twilio
//configurer la BD

app.use(cookieParser());

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
}

app.use(express.json({limit: "8mb"}));
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
app.use(router);

const PORT = process.env.PORT || 5500;
DBConnect();

app.get('/',(req,res) => {
    res.send('hello')
});




app.listen(PORT,() => console.log(`Serveur lancer sur le port ${PORT}`));