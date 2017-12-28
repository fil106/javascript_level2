window.onload = main;


/*ajax class for get our images from json file*/
function AjaxGallery() {
    this.images = {'small': [], 'big': []};
    this.xhr = null;

    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }

}

/*sending ajax to selected file*/
AjaxGallery.prototype.ajaxSend = function(type, file) {

    xhr.onreadystatechange = this.ajaxPulling;
    xhr.open(type, file, true);
    xhr.send(null);

};

/*get answer from server or file*/
AjaxGallery.prototype.ajaxPulling = function() {

    /*check for
    * 0-запрос не инициализирован
    * 1-загрузка
    * 2-запрос принят
    * 3-обмен данными
    * 4-запрос выполнен
    * */
    if(xhr.readyState === 4) {
        /*check mistakes from server*/
        if(xhr.status === 200) {
            console.log("Изображения успешно получены!");
        }
    } else {
        console.log("Получение изображений...");
    }

};

AjaxGallery.prototype.getImages = function() {

    var stringJson = xhr.responseText;
    var objJson = JSON.parse(stringJson);
    var smallImgLength = objJson.images.small.length;
    var bigImgLength = objJson.images.big.length;

    for(var i = 0; i < smallImgLength; i++) {
        this.images.small[i] = objJson.images.small[i];
    }

    for(var j = 0; j < bigImgLength; j++) {
        this.images.big[j] = objJson.images.big[j];
    }

    console.log(this.images);
};

function Gallery(idGallery, classGallary) {

    this.idGallery = idGallery;
    this.classGallary = classGallary;
    this.prevBtn = '<img src="../img/arrow-left.png" class="arrow prev">';
    this.nextBtn = '<img src="../img/arrow-right.png" class="arrow next">';
    this.htmlCode = '';

}

Gallery.prototype.render = function() {

};

function GalleryMainView(classMainView) {

    Gallery.call(this);

    this.classMainView = classMainView;

}

GalleryMainView.prototype.render = function() {

};




















function main() {
    // var images = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg'];
    // var gallery = createGallery(images);
    //
    // document.getElementsByClassName('container')[0].appendChild(gallery);
    // document.getElementsByClassName('gallery_list')[0].addEventListener('click', thumbClick);
    // document.getElementsByClassName('next')[0].addEventListener('click', nextClick);
    // document.getElementsByClassName('prev')[0].addEventListener('click', prevClick);

    // my_gallary = new Gallery('my_id', 'my_class');
    // document.getElementsByClassName('container')[0].innerHTML += my_gallary.render();

    var ajax = new AjaxGallery();
    ajax.ajaxSend('POST', 'package.json');

}

function createGallery(arr) {
    //создаем необходимые элементы
    var gallery = document.createElement('div');
    var mainView = document.createElement('div');
    var galleryList = document.createElement('div');
    var img = document.createElement('img');
    var galleryBg = document.getElementById('gallery_bg');
    var next = document.createElement('img');
    var prev = document.createElement('img');

    //небольшие манипуляции с созданными элементами =)
    gallery.classList.add('gallery');
    mainView.classList.add('main_view');
    galleryList.classList.add('gallery_list');
    img.classList.add('hvr-grow-shadow');
    next.src = 'img/arrow-right.png';
    prev.src = 'img/arrow-left.png';
    next.classList.add('arrow', 'next');
    prev.classList.add('arrow', 'prev');

    for(var i = 0; i < arr.length; i++) {
        img.classList.add('image');
        img.src = 'img/small/' + arr[i];
        galleryList.appendChild(img.cloneNode(true));
    }

    var rand = getRandom(arr);

    img.src = 'img/big/' + rand;
    img.className = '';
    img.classList.add('curr_img');
    gallery.appendChild(next.cloneNode(true));
    gallery.appendChild(prev.cloneNode(true));
    mainView.appendChild(img.cloneNode(true));
    galleryList.querySelector('img[src="' + 'img/small/' + rand + '"]').classList.add('active');

    gallery.appendChild(mainView.cloneNode(true));
    gallery.appendChild(galleryList.cloneNode(true));

    return gallery;
}

function thumbClick(event) {
    var mainView = this.parentNode.querySelector('.main_view');
    var galleryBg = document.getElementById('gallery_bg');

    if(event.target.tagName === 'IMG') {
        var img = event.target.cloneNode(true);
        var bigImg = img.src.replace('small', 'big');

        img.className = '';
        img.classList.add('animated', 'fadeIn', 'curr_img');

        img.src = bigImg;

        mainView.innerHTML = '';
        mainView.appendChild(img.cloneNode(true));

        removeClass('active', document.getElementsByClassName('active'));
        event.target.classList.add('active');
    }
}

function nextClick(event) {
    var mainView = this.parentNode.querySelector('.main_view');
    var images = document.getElementsByClassName('image');
    var img = document.createElement('img');
    var indexActive = 0;

    for(var i = 0; i < images.length; i++) {
        if(images[i].classList.contains('active')) {
            index = i;
        }
    }

    if(index === images.length - 1) {
        img.src = images[0].src;
        img.className = 'curr_img';

        mainView.innerHTML = '';

        mainView.appendChild(img.cloneNode(true));
        removeClass('active', document.getElementsByClassName('active'));
        images[0].classList.add('active');
    } else {
        img.src = images[index + 1].src;
        img.className = 'curr_img';

        mainView.innerHTML = '';

        mainView.appendChild(img.cloneNode(true));
        removeClass('active', document.getElementsByClassName('active'));
        images[index + 1].classList.add('active');
    }
}

function prevClick(event) {
    var mainView = this.parentNode.querySelector('.main_view');
    var images = document.getElementsByClassName('image');
    var img = document.createElement('img');
    var indexActive = 0;

    for(var i = 0; i < images.length; i++) {
        if(images[i].classList.contains('active')) {
            index = i;
        }
    }

    if(index === 0) {
        img.src = images[images.length - 1].src;
        img.className = 'curr_img';

        mainView.innerHTML = '';

        mainView.appendChild(img.cloneNode(true));
        removeClass('active', document.getElementsByClassName('active'));
        images[images.length - 1].classList.add('active');
    } else {
        img.src = images[index - 1].src;
        img.className = 'curr_img';

        mainView.innerHTML = '';

        mainView.appendChild(img.cloneNode(true));
        removeClass('active', document.getElementsByClassName('active'));
        images[index - 1].classList.add('active');
    }
}

function removeClass(cls, arr) {
    for(var i = 0; i < arr.length; i++) {
        arr[i].classList.remove(cls);
    }
}

function getRandom(arr) {
    var rand = Math.floor(Math.random() * (arr.length));
    return arr[rand];
}