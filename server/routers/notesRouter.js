/**
 * notesRouter.js
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const Passengers = require('../../models/database');

const store = new SimpleJsonStore('./data.json', { items: [] });
//const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  console.log('Index page only');
  next();
}, (req, res) => {
  res.json(store.get('items'));
});

//get from mongo
// router.get('/', (req, res, next) => {
//   next();
// }, (req, res) => {
//   Passengers.find({}, (err, data) => {
//       res.render("index.pug", { data: data });
//       //res.json(data);
//      console.log(data);
//   });
// });

// get all the bears (accessed at GET http://localhost:8080/api/bears)
//  router.get('/', function(req, res) {
//     Passengers.find({}, function(err, data) {
//         if (err)
//             res.send(err);
//         res.json(data);
//         console.log(data);
//     });
// });

router.get('/:id', (req, res) => {
  let itemz = {};
  const items = store.get('items');
  itemz = items.find(item => item.id === req.params.id);
  res.json(itemz);
});

//post for database mongodb
router.post('/', (req, res) => { //DITO NAG SAVE ANG ADD PRODUCT
  var tblModel = new Passengers();
  tblModel.productName = req.body.productName;
  tblModel.quantity = req.body.quantity;
  tblModel.price = req.body.price;
  tblModel.save(function (err) {
    if (err)
      res.send(err);
    res.json({ message: 'Bear created!' });
  });
});

// router.post('/', (req, res) => { //DITO NAG SAVE ANG ADD PRODUCT
//   const items = store.get('items');
//   const newNote = {
//     id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
//     productName: req.body.productName,
//     quantity: req.body.quantity,
//     price: req.body.price
//   };

//   items.push(newNote);
//   store.set('items', items);
//   res.json(items);
// });

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const items = store.get('items');

  for (let i = 0; i < items.length; i++) {
    if (items[i].id == id) {  //dito lang ang problem yung id must == not ===
      items[i].productName = req.body.productName;
      items[i].quantity = req.body.quantity;
      items[i].price = req.body.price;
      break;
    }
    console.log(`Update ito ${items[i].productName}`);
  }

  store.set('items', items);
  res.json(store.get('items'));

});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const items = store.get('items');
  const newItems = items.filter(item => Number(item.id) !== Number(id));

  store.set('items', newItems);
  res.json(newItems);
});

module.exports = router;
