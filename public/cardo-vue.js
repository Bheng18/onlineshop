(function () {
  var cardoVue = new Vue({
    el: '#cardoVue',
    data: {
      productName: null,
      quantity: null,
      price: null,
      datas: [],
      items: [],
      cart: [],
      qty: null,
      addProduct: "/addProduct" //- for link to addProuct
    },
    created: function () {
      this.fetchData();
    },

    methods: {

      addNote: function () {
        var self = this;
        var payload = {
          productName: self.productName,
          quantity: self.quantity,
          price: self.price
        };
        axios.post('/api/item', payload)//
          .then(function (res) {
            //self.items = res.data; 
            this.items = res.data;
            self.clear();
          })
          .catch(function (err) {
            console.log(err);
          });
        window.location = "/";
      },

      clear: function () {
        this.productName = null;
        this.quantity = null;
        this.price = null;
      },

      goBack: function () {
        window.location = "/";
      },

      deleteNote: function (item) {
        var self = this;
        axios.delete('/api/item/' + item.id)
          .then(function (res) {
            // self.item = res.data;
            var index = -1;
            for (var i = 0; i < self.items.length; ++i) {
              if (Number(self.items[i].id) === Number(item.id)) {
                index = i;
                break;
              }
            }
            self.items.splice(index, 1);
          })
          .catch(function (err) {
          });
      },

      addTocart: function (item) {
        this.cart.push(item);
      },

      checkout: function (item) {
        //this.items.push(quantity);
        const quantity = item.quantity;
        const qty = this.qty;
        const qqty = Number(quantity) + Number(qty);

        console.log(qqty);
      },

      editProduct: function (item) {
        this.cart.push(item);
      },

      updateItem: function (item) {
        var payload = {
          productName: this.productName = item.productName,
          quantity: this.quantity = item.quantity,
          price: this.price = item.price
        };
        window.location = "/";
        axios.put(`/api/item/${item.id}`, payload) //, 
          .then(function (res) {
            this.items = res.data;
            this.clear();
            console.log(payload.productName);
          })
          .catch(function (err) {
          });
      },

      fetchData() {
        var self = this;
        // axios.get('http://localhost:3300/api/item')
        axios.get('http://localhost:3300')
          .then(function (res) {
            self.datas = res.data;
          })
          .catch(function (err) {
            self.datas = [];
          });
      },

    }
  });
  console.log(cardoVue);
})();