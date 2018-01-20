function Reviews() {
  Container.call(this, 'reviews');

  this.classReviewsWrapper = 'reviews-wrapper';
  this.classReviewsItems = 'reviews-list';
  this.classReviewsItem = 'item';
  this.classDeleteReviewIstem = 'remove-item';

  this.classModerationWrapper = 'moderation-wrapper';
  this.classModerationItems = 'reviews-moderation-list';
  this.classModerationItemsGood = 'reviews-moderation-good';

  this.reviewsItems = [];
  this.collectReviewsItems();
}

Reviews.prototype = Object.create(Container.prototype);
Reviews.prototype.constructor = Reviews;

Reviews.prototype.render = function (root) {
  var reviewsDiv = $('<div />', {
        class: this.classReviewsWrapper
      });
  var reviewsModerationDiv = $('<div />', {
        class: this.classModerationWrapper
      });

  reviewsDiv.appendTo(root);
  reviewsModerationDiv.appendTo(root);
};

Reviews.prototype.getNewId = function(){
  // костыль для получения id
  return parseInt(new Date().getTime()/1000); // unix time
}

Reviews.prototype.add = function (user, name, message) {
  var reviewItem = {
    "user": parseInt(user),
    "name": name,
    "id": this.getNewId(),
    "message": message,
    "moderated": false
  };
  this.reviewsItems.push(reviewItem);
  this.refresh();
};

Reviews.prototype.delete = function (idReview) {
  for (var index in this.reviewsItems) {
    if (this.reviewsItems[index].id == idReview){
      this.reviewsItems.splice(index, 1);
      break;
    }
  }
  this.refresh();
};

Reviews.prototype.moderated = function (idReview) {
  for (var index in this.reviewsItems) {
      if (this.reviewsItems[index].id == idReview){
        this.reviewsItems[index].moderated = true;
        break;
      }
  }
  this.refresh()
};

Reviews.prototype.refresh = function () {
  var reviewsDiv = $('.' + this.classReviewsWrapper);
  var reviewsModerationDiv = $('.' + this.classModerationWrapper);

  reviewsDiv.empty();
  reviewsModerationDiv.empty();

  var reviewsListDiv = $('<div />', {
    class: this.classReviewsItems,
    text: "Отзывы:"
  });
  var reviewsModerationListDiv = $('<div />', {
    class: this.classModerationItems,
    text: "На модерации:"
  });

  for (var index in this.reviewsItems) {
      var htmlItem = "";
      var itemDiv = $('<div />', {
        class: this.classReviewsItem
      });
      htmlItem += this.htmlItem(this.reviewsItems[index]);
      itemDiv.append(htmlItem);
      if (this.reviewsItems[index].moderated){
        reviewsListDiv.append(itemDiv);
      } else {
        reviewsModerationListDiv.append(itemDiv);
      }
  }

  if (reviewsListDiv.has('.' + this.classReviewsItem).length > 0){
    reviewsDiv.append(reviewsListDiv);
  }
  if (reviewsModerationListDiv.has('.' + this.classReviewsItem).length > 0){
    reviewsModerationDiv.append(reviewsModerationListDiv);
  }
};

Reviews.prototype.htmlItem = function (item) {
  var html = "";
  html += '<p>' + item.name + '</p>';
  html += '<p>Сообщение: ' + item.message + '</p>';
  html += '<a href="#" data-id-reviews="' + item.id + '" class="' + this.classDeleteReviewIstem + '">Удалить</a>';
  if (item.moderated === false){
    html += '<a href="#" data-id-reviews="' + item.id + '" class="' + this.classModerationItemsGood + '">Одобрить</a>';
  }
  return html;
}

Reviews.prototype.collectReviewsItems = function () {
  $.ajax({
    url: 'ajax/getreviews.json',
    dataType: 'json',
    success: function (data) {
      for (var index in data.reviews) {
        if (data.reviews[index].name != "" || data.reviews[index].message != ""){
            this.reviewsItems.push(data.reviews[index]);
        }
      }

      this.refresh();
    },
    context: this
  });
};