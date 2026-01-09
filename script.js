gsap.registerPlugin(ScrollTrigger);

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

function ScrollTriggerSection2ani() {
  $(window).on('load', function () {
    var $background = $('.sec-2-brand>.container>.background>img')
    var $object1 = $('.sec-2-brand>.container>.object-1')
    var $object2 = $('.sec-2-brand>.container>.object-2')
    var $object3 = $('.sec-2-brand>.container>.object-3')

    gsap.to($background, {
      yPercent: -30,
      scrollTrigger: {
        trigger: ".sec-2-brand",
        pin: true,
        start: "top top",
        end: "+=11000",
        scrub: true,
      }
    });

    gsap.set($object1, { scale: 2 });
    gsap.set($object2, { scale: 2 });
    gsap.set($object3, { scale: 2 });

    gsap.to($object1, {
      y: -1700,
      scale: 1,
      scrollTrigger: {
        trigger: $object1,
        start: "top+=3000 top",
        end: "+=5000",
        scrub: true,
        // markers: true,
      }
    });


    gsap.to($object2, {
      y: -1700,
      scale: 1,
      scrollTrigger: {
        trigger: $object2,
        start: "top top",
        end: "+=5000",
        scrub: true,
        // markers: true,
      }
    });
    gsap.to($object3, {
      y: -1700,
      scale: 1,
      scrollTrigger: {
        trigger: $object3,
        start: "top+=6000 top",
        end: "+=5000",
        scrub: true,
        // markers: true,
      }
    });
  });
}

function sec3SwiperInit() {
  var swiper = new Swiper(".sec-3-books>.content>.swiper-wrap>.swiper-box-wrap .swiper", {
    slidesPerView: "auto",
    spaceBetween: 40,

    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    breakpoints: {
      1201: {
        spaceBetween: 40,
      },
      551: {
        spaceBetween: 20,
      },
      0: {
        spaceBetween: 14,
      }
    },
  });
}

function sec3SwipertabInit() {
  var $tabMenu = $('.sec-3-books>.content>.swiper-wrap>div:first-child .tab-menu-box>div');
  var $swiper = $('.sec-3-books>.content>.swiper-wrap>.swiper-box-wrap>.swiper-box');

  $tabMenu.on('click', function () {

    var $index = $(this).index();

    $(this).addClass('active').siblings().removeClass('active');
    $swiper.eq($index).addClass('active').siblings().removeClass('active');

  });
}

function scrollTriggerClipPath() {
  $(window).on('load', function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sec-3-books',
        start: 'top top+=500',
        end: '+=1000',
        scrub: true,
        // markers: true,
      }
    });

    tl.fromTo(
      '.sec-3-books > .content',
      { clipPath: 'inset(0 50% 0 50% round 40px 40px 0 0)' },
      { clipPath: 'inset(0 0% 0 0% round 40px 40px 0 0)' }
    );
  });

}

function sec4SwiperInit() {
  var swipersec4 = new Swiper(".swiper-sec4", {
    effect: 'coverflow',
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    speed: 600,

    touchStartPreventDefault: false,
    simulateTouch: true,

    coverflowEffect: {
      rotate: 0,
      stretch: -160,
      depth: 250,
      modifier: 1,
      slideShadows: false,
    },

    on: {
      init() { setTimeout(() => { this.update(); this.slideToLoop(1, 0); }, 0); },
      realIndexChange() {
        const index = this.realIndex;

        $('.sec-4-bookTrailer>.background>div').eq(index).addClass('active').siblings().removeClass('active');
      },
    },

    breakpoints: {
      1201: {
        coverflowEffect: {
          stretch: -160,
        },
      },
      769: {
        coverflowEffect: {
          stretch: -110,
        },
      },
      551: {
        coverflowEffect: {
          stretch: -70,
        },
      },
      0: {
        coverflowEffect: {
          stretch: -50,
        },
      },
    }
  });
}

function sec6SwipeImageInit() {
  var $swipeimageList = $('.sec-6-news>.container>.content>ul>li');
  var $swipeimage = $('.sec-6-news>.container>.content>ul>li>a>.swipeimage');
  gsap.set($swipeimage, { yPercent: -50, xPercent: -50 });

  let firstEnter;

  gsap.utils.toArray($swipeimageList).forEach((el) => {
    const image = el.querySelector("img.swipeimage"),
      setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" }),
      setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" }),
      align = (e) => {
        if (firstEnter) {
          setX(e.clientX, e.clientX); //https://gsap.com/docs/v3/GSAP/gsap.quickTo()/#optionally-define-a-start-value
          setY(e.clientY, e.clientY);
          firstEnter = false;
        } else {
          setX(e.clientX);
          setY(e.clientY);
        }
      },
      startFollow = () => document.addEventListener("mousemove", align),
      stopFollow = () => document.removeEventListener("mousemove", align),
      fade = gsap.to(image, {
        autoAlpha: 1,
        ease: "none",
        paused: true,
        duration: 0.1,
        onReverseComplete: stopFollow
      });

    el.addEventListener("mouseenter", (e) => {
      firstEnter = true;
      fade.play();
      startFollow();
      align(e);
    });

    el.addEventListener("mouseleave", () => fade.reverse());
  });
}












headerInit();
ScrollTriggerSection2ani();
sec3SwiperInit();
sec3SwipertabInit();
scrollTriggerClipPath();
sec4SwiperInit();
sec6SwipeImageInit();