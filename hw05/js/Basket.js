function Basket() {
    Container.call(this, 'basket');

    this.countGoods = 0;
    this.amount = 0;

    this.basketItems = [];
    this.collectBasketItems(); // Загружаем товары, которые уже добавлены (json файл)
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

//
// TODO посмотреть метод render!
//

Basket.prototype.render = function (root) { // Генерация базовой разметки
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root);
};

Basket.prototype.commentsRender = function(root) {
    var commentsBlock = $('<div />', {class: 'comments'});
    $('<h4>Комментарии:</h4>').appendTo(commentsBlock);
    var ul = $('<ul />');

    $.get({
        url: './basket.json',
        dataType: 'json',
        success: function (data) {
            var commentsJson = data.basket[0].comments;

            for(var i in commentsJson) {
                var li = $('<li />');
                li.text(commentsJson[i].text);
                li.appendTo(ul);
            }
        },
        context: this
    });

    ul.appendTo(commentsBlock);
    commentsBlock.appendTo(root);

};

Basket.prototype.add = function (product, quantity, price) {
    // console.log(product, quantity, price);
    var basketItems = {
      "id_product": product,
      "price": price
    };

    // for (var i = 1; i <= quantity; i++) {
    //     this.countGoods++;
    // }


    // Немного модифицировал вышенаписанное
    this.countGoods += +quantity;
    this.amount += +price * +quantity;

    this.basketItems.push(basketItems);
    this.refresh();
};

Basket.prototype.refresh = function () {
  var $basketDataDiv = $('#basket_data'); // тут была ошибка, вместо basket_data был basket_wrapper
  $basketDataDiv.empty();
  $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
  $basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');
};

Basket.prototype.collectBasketItems = function () {
  var appendId = '#' + this.id + '_items';

  $.get({
      url: './basket.json',
      dataType: 'json',
      success: function (data) {
          // Получаем и выводим начальные данные корзины
          var basketData = $('<div />', {
              id: 'basket_data'
              // text: 'Text'
          });

          this.countGoods = data.basket.length;
          this.amount = data.amount;

          basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
          basketData.append('<p>Сумма: ' + this.amount + '</p>');

          basketData.appendTo(appendId);

          for (var index in data.basket) {
              this.basketItems.push(data.basket[index]);
          }
      },
      context: this
  });
};