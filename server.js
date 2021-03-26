if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const dotenvParser = require('dotenv-parse-variables');
    let env = dotenv.config({});
}

const expressAPI = require('express');
const app = expressAPI();
const layouts = require('express-ejs-layouts');
const router = require('./routers/index');
const authorRouter = require('./routers/authors');
//const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
app.set('layout', 'layouts/layout');
app.use(layouts);
app.use(expressAPI.static('static'));
app.use(expressAPI.urlencoded({ limit: '20mb', extended: false }));

// backend
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });

// get mongoDB connection
const mongoDB = mongoose.connection;

// check for error
mongoDB.on('error', error => console.error(error));

// mongoDB once connected
mongoDB.once('open', () => {
    console.log('Connected to database');
})


// using routers
app.use('/', router);
app.use('/author', authorRouter);

app.listen(process.env.PORT || 3300);