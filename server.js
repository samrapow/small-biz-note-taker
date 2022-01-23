const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

const htmlRoutes = require('./routes/htmlRoutes');




const app = express();

// choose open port from heroku
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoutes);

app.use('/', htmlRoutes);



// listen to port
app.listen(PORT, () => {
    console.log(`Active on PORT: ${PORT}`);
});

