/**
 * @description
 * Entry file for The Province Man's Web App
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const notesRouter = require('./server/routers/notesRouter');
const aboutRouter = require('./server/routers/aboutRouter');
const indexRouter = require('./server/routers/indexRouter');
const addProductRouter = require('./server/routers/addProductRouter');
const customerproductRouter = require('./server/routers/customerproductRouter');
//const editProductRouter = require('./server/routers/editProductRouter');
//const TablePassengers = require('./models/database');

const port = 3300;

//connect to mongodb
mongoose.connect('mongodb://localhost/passengers', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//- Middleware: Logs the request to the server
//- the 'dev' is formatted as ":http_verb :url :status_code :response_time ms - :res[content-length]"
//- e.g. GET / 304 602.566 ms - -
//- READ More: https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

// Middleware: Parses the value on the request body and then interprets its value
//             so you can use it as req.body
// e.g. req.body.title
//      req.body.content
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware: To serve static files such as images, CSS files, and JavaScript files
//             found in the public folder
// e.g. public/cardo.jpg is accessed as http://localhost:3300/cardo.jpg
//      public/images/cardo.jpg is accessed as http://localhost:3300/images/cardo.jpg
//
// READ More: http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Custom Middleware: Sets the req.viewModel as an object
//                    so that we can use it on all our routers.
// Purpose: So we do not have to redeclare the title on all our pages.
app.use((req, res, next) => {
  req.viewModel = {
    title: 'Online Ordering System'
  };
  next();
});

// Sets our templating engine for views is Pug and its target directory
// NOTE: The __dirname is a global Node.js variable important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// Note: The order must be maintained here
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/addProduct', addProductRouter);
//app.use('/editProduct', editProductRouter);
app.use('/api/item', notesRouter);//DITO DUMAAN ANG ADDPRODUCT puntang post
app.use('/customer', customerproductRouter);

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
