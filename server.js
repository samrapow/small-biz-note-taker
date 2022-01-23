const express = require('express');

const htmlRoutes = require('./routes/htmlRoutes');

const apiRoutes = require('./routes/apiRoutes');


const app = express();

// choose open port from heroku
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', apiRoutes);

app.use('/', htmlRoutes);

app.use(express.static('public'));

// listen to port
app.listen(PORT, () => {
    console.log(`Active on PORT: ${PORT}`);
});

