//Dependencies
const express = require('express');

//Route files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Express
const app = express();

//Sets up the PORT
const PORT = process.env.PORT || 3001;

//Parse incoming JSON Data
app.use(express.urlencoded({extended: true}));


app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//Listener
app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}!`);
});
