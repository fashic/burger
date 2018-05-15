$(function () {
  $('[data-fancybox]').fancybox({

  });
});


$(function () {
  $('.slider-box__list').slick({
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    adaptiveHeight: true,
  });
});

$(function () {
  $('.team-acco__title').on('click', function (e) {
    e.preventDefault()

    var elem = $(e.target),
      item = elem.closest('.team-acco__item'),
      content = item.find('.team-acco__content'),
      reqHeight = item.find('.team-acco__desc').outerHeight,
      items = item.siblings(),
      otherContent = items.find('.team-acco__content');

    if (!item.hasClass('active')) {
      items.removeClass('active');
      item.addClass('active');
      otherContent.css({
        'height': 0
      })
      content.css({
        'height': reqHeight
      })
    } else {
      item.removeClass('active')
      content.css({
        'height': 0
      })
    }

  })
});

$(function () {
  $('.menu__block').on('click', function (e) {
    e.preventDefault()

    var elem = $(e.target),
      item = elem.closest('.menu__item'),
      content = item.find('.menu__content'),

      // reqWidth = 100 + %,
      items = item.siblings(),
      otherContent = items.find('.menu__content');


    if (!item.hasClass('.active')) {
      items.removeClass('active');
      item.addClass('active');
      otherContent.css({
        'width': 0
      })
      content.css({
        'width': '100%'
      })
    } else {
      item.removeClass('active')
      content.css({
        'width': 0
      })
    }
  });
});

$(function () {
      ymaps.ready(init);
      var myMap,
        myPlacemark;

      function init() {
        myMap = new ymaps.Map("map", {
            center: [56.838283, 60.603274],
            zoom: 11
        });       

        myPlacemarkOne = new ymaps.Placemark([56.829573, 60.552986], {}, {
          iconLayout: 'default#image',
          iconImageHref: '../images/icons/map-marker.svg',
          iconImageSize: [50, 62],
          iconImageOffset: [0, 0],
      });       
        myPlacemarkTwo = new ymaps.Placemark([56.851589, 60.624397], {}, {
          iconLayout: 'default#image',
          iconImageHref: '../images/icons/map-marker.svg',
          iconImageSize: [50, 62],
          iconImageOffset: [0, 0],
      });   
          myPlacemarkThree = new ymaps.Placemark([56.827879, 60.630577], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../images/icons/map-marker.svg',
            iconImageSize: [50, 62],
            iconImageOffset: [0, 0],
      });
      


      myMap.geoObjects.add(myPlacemarkOne);
      myMap.geoObjects.add(myPlacemarkTwo);
      myMap.geoObjects.add(myPlacemarkThree);

      }

        });