var moduleApp = {
  'checkBasket':function(){
    var basket = new Basket();
    basket.render('.basket-list');

    $('.buyme').on('click', function () {
        var idProduct = parseInt($(this).attr('data-id-product'));
        var name = $(this).parent().find('.name').html();
        var quantity = parseInt($(this).parent().find('.quantity').val());
        var price = parseInt($(this).attr('data-price'));

        basket.add(idProduct, quantity, price, name);
    });

    $('.basket-list').on('click', '.remove-item', function (e) {
        e.preventDefault();
        var idProduct = parseInt($(this).attr('data-id-product'));

        basket.delete(idProduct);
    });
  },
  'checkReviews':function(){
    var reviews = new Reviews();
    reviews.render('#reviews');

    $('.form-review').on('click', 'input[name="submit"]', function (e) {
        e.preventDefault();
        var user = $('input[name="user"]').val();
        var name = $('input[name="name"]').val();
        var message = $('textarea[name="message"]').val();
        if (name != "" || message != ""){
          reviews.add(user, name, message);
        }
    });
    $('#reviews').on('click', '.reviews-moderation-good', function (e){
      e.preventDefault();
      var idReview = parseInt($(this).attr('data-id-reviews'));

      reviews.moderated(idReview);
    });
    $('#reviews').on('click', '.remove-item', function (e){
      e.preventDefault();
      var idReview = parseInt($(this).attr('data-id-reviews'));

      reviews.delete(idReview);
    });
  }
}

$(document).ready(function(){
  moduleApp.checkBasket();
  moduleApp.checkReviews();
});