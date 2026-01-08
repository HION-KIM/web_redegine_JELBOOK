function headerInit() {
  $('.header-inner .btn-box').click(function () {
    var $width = window.innerWidth;

    if ($width <= 768) {
      $('.header-side-menu-box').toggleClass('active');
      $('.header-menu-box').removeClass('active');

    } else {
      $('.header-menu-box').addClass('active');
      $('.header-side-menu-box').removeClass('active');
    }

    if ($('.header-side-menu-box').hasClass('active')) {
      $('.header-inner').addClass('active');

    } else {
      $('.header-inner').removeClass('active');
    }
  });

  $('.header-menu-box > .closed-btn').click(function () {
    $('.header-menu-box').removeClass('active');
  });

  $('.header-side-menu-box>div>.menu-box>ul>li').click(function () {

    $this = $(this);

    $this.addClass('active').children('ul').slideToggle();
  })
}

headerInit();