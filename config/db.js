const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () => {
    try {
        await mongoose.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        } );
        console.log('DB Conectada');
    } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1); 
    }
}

module.exports = conectarDB;