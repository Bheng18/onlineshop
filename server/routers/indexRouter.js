/**
 * indexRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

// Initializes the data-2.json file with item as its initial value if empty
const store = new SimpleJsonStore('./data-2.json', { items: [] });
const Passengers = require('../../models/database');

router.get('/', function getIndexPage(req, res) {
 let viewModel = req.viewModel;
  // We can extend the viewModel and add new properties
  // e.g. viewModel.appName = 'Cardo';
  //      viewModel.count = 10;
  //      viewModel.choices = ['apple', 'orange', 'grapes'];
  // Read more: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
  viewModel.items = store.get('items');
  //Passengers.find({}, (err, data)=>{
      res.render('index.pug', viewModel);
      // console.log(data);
});

router.post('/', function submitNotes(req, res) {
  // Process: Get item from json -> Add new note -> Save the item
  let items = store.get('items');
  items.push({
    productName: req.body.productName,
    quantity: req.body.quantity,
    price: req.body.price
  });

  store.set('items', items);

  //- It just reload the page on /
  // More on redirection: https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
  res.redirect('/');
});

module.exports = router;
