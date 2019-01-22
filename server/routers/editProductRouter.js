/**
 * aboutRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const store = new SimpleJsonStore('./data.json', { items: [] }); //notes

// router.get('/:id', (req, res) => {
//     let note = {};
//     const notes = store.get('notes');
//     res.render('editProduct.pug', {id: req.params.id});
// });

// router.get('/:id', (req, res) => {
//     const id  = req.params.id;
//     let itemz = {};
//     const items = store.get('items');
//     itemz = items.find(items => Number(items.id) === Number(id));
//     //res.json(note);
//     console.log(itemz);
    
//     res.render('editProduct.pug', {items: itemz});
    
//   });

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const items = store.get('items');
  
    console.log(id);
  
    for(let i = 0; i < items.length; i++) {
      if(items[i].id === id) {
        items[i].productName = req.body.productName;
        items[i].quantity = req.body.quantity;
        items[i].price = req.body.price;
        this.items.push(items);
        break;
      }
    }
    store.set('items', items);
    res.json(store.get('items'));
    res.render('editProduct.pug', {items: items});
    //res.redirect('/');
  });

module.exports = router;
