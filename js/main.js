$(function () {
  $('[data-fancybox]').fancybox({

  });
});

$(function () {

  var sections = $('.section'),
    display = $('.maincontent'),
    inScroll = false,
    scrollMenu = $('.scroll-menu__item');

  var md = new MobileDetect(window.navigator.userAgent);
  isMobile = md.mobile();


  var performTransition = function (sectionEq) {

    if (inScroll) return
    inScroll = true;

    var position = (sectionEq * -100) + '%';

    display.css({
      'transform': 'translateY(' + position + ')',
      '-webkit-transform': 'translateY(' + position + ')'
    })

    sections.eq(sectionEq).addClass('active')
      .siblings().removeClass('active');

    scrollMenu.eq(sectionEq).addClass('active')
      .siblings().removeClass('active');

    setTimeout(function () {
      inScroll = false;
      // $('.scroll-menu__item').eq(sectionEq).addClass('active')
      //   .siblings().removeClass('active'); // отслеживаем активное скрол меню
    }, 1300);
  }


  var defineSections = function (sections) {
    var activeSection = sections.filter('.active');
    return {
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev()
    }

  }

  var scrollToSection = function (direction) {
    var section = defineSections(sections);

    if (direction == 'down' && section.prevSection.length) {
      performTransition(section.prevSection.index());
    }
    if (direction == 'up' && section.nextSection.length) {;
      performTransition(section.nextSection.index());
    }
  }

  $('.wrapper').on({
    wheel: function (e) {
      var deltaY = e.originalEvent.deltaY;
      var direction = deltaY > 0 ? 'up' : 'down';
      scrollToSection(direction)
    },

    //запрещаем touchmove
    touchmove: function (e) {
      e.preventDefault();
    }
  });


  $(document).on('keydown', function (e) {
    var section = defineSections(sections);

    switch (e.keyCode) {
      case 40: //вверх
        if (section.nextSection.length) {
          performTransition(section.nextSection.index());
        }
        break;
      case 38: //вниз
        if (section.prevSection.length) {
          performTransition(section.prevSection.index());
        }
        break;
    }
  });

  $('[data-scroll-menu-name]').on('click touchstart', function (e) {
    e.preventDefault();

    var elem = $(e.target);
    var sectionNum = parseInt(elem.attr('data-scroll-menu-name')); //приводим к числовому значению
    performTransition(sectionNum);
  });

  if (isMobile) {
    $(window).swipe({
      //Generic swipe handler for all directions
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        scrollToSection(direction)
      }
    });
  }


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


var submitForm = function (ev) {
  ev.preventDefault();
  // console.log(ev);

  var form = $(ev.target)

  var request = ajaxForm(form);

  request.done(function (msg) {
    var mes = msg.mes,
      status = msg.status;
    if (status === 'OK') {
      form.append('<p class="success">' + mes + '</p>');
    } else {
      form.append('<p class="error">' + mes + '</p>');
    }
  });

  request.fail(function (jqXHR, textStatus) {
    alert("Request failed: " + textStatus);
  });
}

var ajaxForm = function (form) {

  var url = form.attr('action'),
    data = form.serialize();

  return $.ajax({
    type: 'POST',
    url: url,
    data: data,
    dataType: 'JSON'
  });

}

$('#order-form').on('submit', submitForm);