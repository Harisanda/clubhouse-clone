const mongoose = require('mongoose');
// installer mongoose

function DBConnect () {
    const DB_URL = process.env.DB_URL;

    mongoose.connect("mongodb+srv://harisandaramarovao:034harisanda025@cluster0.udtpzgb.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () =>{
        console.log('DB connecté...');
    })
}

module.exports = DBConnect;