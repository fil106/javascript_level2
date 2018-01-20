function Basket() {
    Container.call(this, 'basket');

    this.countGoods = 0;
    this.amount = 0;

    this.classBasketItems = 'basket-items';
    this.classBasketData = 'basket-data';
    this.classDeleteBasketItem = 'remove-item';

    this.basketItems = [];
    this.collectBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function (root) {
    var basketDiv = $('<div />', {
        id: this.id
    });

    var basketItemsDiv = $('<div />', {
        class: this.classBasketItems
    });

    $('<h2>Корзина</h2>').appendTo(basketDiv);
    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root);
};

Basket.prototype.update = function (item) {
  var update = false;
  for (var index in this.basketItems) {
    if (this.basketItems[index].id == item.id){
      this.basketItems[index].quantity += item.quantity;
      update = true;
      break;
    }
  }
  return update;
};

Basket.prototype.add = function (idProduct, quantity, price, name) {
    var basketItem = {
      "name": name,
      "id": idProduct,
      "quantity": quantity,
      "price": price
    };

    if (this.update(basketItem) === false){
      this.basketItems.push(basketItem);
    }

    this.refresh();
};

Basket.prototype.delete = function (idProduct) {
  for (var index in this.basketItems) {
    if (this.basketItems[index].id == idProduct){
      this.basketItems.splice(index, 1);
      break;
    }
  }

  this.refresh();
};

Basket.prototype.refresh = function () {
  var basketDataDiv = $('<div />', {
      class: this.classBasketData
  });

  var basketTable = $('<table />', {border: 1, width: '100%'});
  var count = 0;
  var amount = 0;

  $('.basket-list').empty();
  basketDataDiv.empty();
  basketTable.empty();

  $('.basket-list').append($('<h2>Корзина</h2>'));
  $('<tr><th>Наименование</th><th>Количество</th><th>Стоимость</th><th>Действие</th></tr>').appendTo(basketTable);

  for (var index in this.basketItems) {
      this.htmlItem(this.basketItems[index]).appendTo(basketTable);

      count += +this.basketItems[index].quantity;
      amount += +this.basketItems[index].price * +this.basketItems[index].quantity;
  }

  this.countGoods = count;
  this.amount = amount;

  basketDataDiv.append(basketTable);
  basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
  basketDataDiv.append('<p><b>Общая Сумма: ' + this.amount + '</b></p>');
  $('.basket-list').append(basketDataDiv);
};

Basket.prototype.htmlItem = function (item) {
  var result = $('<tr />');
  $('<td />', {text: item.name}).appendTo(result);
  $('<td />', {text: item.price + ' руб.'}).appendTo(result);
  $('<td />', {text: item.quantity + ' шт.'}).appendTo(result);
  $('<td><a href="#" data-id-product="' + item.id + '" class="' + this.classDeleteBasketItem + '">Удалить</a></td>').appendTo(result);
  return result;
};

Basket.prototype.collectBasketItems = function () {
  $.ajax({
      url: 'ajax/getbasket.json',
      dataType: 'json',
      success: function (data) {
          for (var index in data.basket) {
              this.basketItems.push(data.basket[index]);
          }
          this.refresh();
      },
      context: this
  });
};