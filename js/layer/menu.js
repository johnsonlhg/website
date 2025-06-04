(function ($) {

    $.fn.menumaker = function (options) {
        var headernav = $(this), settings = $.extend({
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function () {
            headernav.prepend('<div id="menu-toggle"><span class="nav-open"></span><span class="nav-close"></span></div>');
            $(this).find("#menu-toggle").on('click', function () {

                $(this).toggleClass('menu-opened');
                $('html').toggleClass('no-touch');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                } else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });

            headernav.find('li ul').parent().addClass('has-sub');


            multiTg = function () {
                headernav.find(".has-sub").prepend('<span class="submenu-button"></span>');
                headernav.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    $(this).siblings('a').toggleClass('cur');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    } else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else headernav.addClass('dropdown');

            if (settings.sticky === true) headernav.css('position', 'fixed');

            resizeFix = function () {
                if ($(window).width() >= 960) {
                    headernav.find('ul').show();
                }

                if ($(window).width() < 960) {
                    headernav.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function ($) {
  $(document).ready(function () {
      $(".header-nav").menumaker({
          format: "multitoggle"
      });

      var initApplicationsSwiper = function(){
          setTimeout(function () {
              var applicationsSwiper = new Swiper(".apps.swiper", {
                  pagination: {
                      el: ".swiper-pagination",
                      clickable: true,
                  },
                  direction: "vertical",
                  slidesPerView: 2,
                  spaceBetween: 10,
                  effect: 'slide',
                  autoplay: {delay: 6000,stopOnLastSlide: false,disableOnInteraction: true},
              });
          }, 10);
      }
      var initCaseappsSwiper = function(){
          setTimeout(function () {
          var caseappsSwiper = new Swiper(".caseapps.swiper", {
              pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
              },
              slidesPerView: 2,
              spaceBetween: 5,
              effect: 'slide',
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              },
              loop:true,
              autoplay: {delay: 6000,disableOnInteraction: true},
          });
          }, 10);
      }

      var initCustomMenu = function(customMenuDom){
          let menuDom = customMenuDom.find('.rightmenu').find('> ul').eq(0);
          menuDom.find('> li').eq(0).show().siblings('li').hide();
          let submenuClass = menuDom.find('> li').eq(0).find('> ul').data('child');
          if(submenuClass){
              let subMenuDom = customMenuDom.find('.rightmenu').find('> ul').eq(1).find('> li').eq(0);
              subMenuDom.show().siblings('li').hide();
              subMenuDom.find('> ul > li').eq(0).show().siblings('li').hide();
          }
      }

      $(".header-nav").delegate('.custommenus ul.has-child > li > a', 'mouseover hover clik', function(){
          var ulDom  =  $(this).parents('ul.has-child');
          var liDom  =  $(this).parents('li');

          var liIndex = ulDom.children().index(liDom);
          var targetClass = ulDom.data('child');
          var parentIndex = 0;
          var rightMenuDom = liDom.parents('.rightmenu');
          if(rightMenuDom.length > 0){
              parentIndex =rightMenuDom.find('li.has-sub').index($(this).parents('li.has-sub'));
          }
          $('.custommenus').find('ul.'+targetClass).find('> li').eq(liIndex).show().siblings('li').hide();
          var subtargetClass = $('.custommenus').find('ul.'+targetClass).find('> li').eq(liIndex).find('ul').data('child');
          var parentClass = ulDom.data('parent');
          if(parentClass){
              $('.custommenus').find('ul.subcategory').find('> li.has-sub').eq(parentIndex).show().siblings('li').hide();
              $('.custommenus').find('ul.applications').find('> li.has-sub').eq(parentIndex).show().siblings('li').hide().find('ul').find('> li').eq(liIndex).show().siblings('li').hide();
          }
          if(subtargetClass){
              $('.custommenus').find('ul.'+targetClass).find('> li').eq(liIndex).show().siblings('li').hide();
              $('.custommenus').find('ul.'+subtargetClass).find('> li').eq(liIndex).show().siblings('li').hide().find('ul').find('> li').eq(0).show().siblings('li').hide();
          }
          initApplicationsSwiper();
          initCaseappsSwiper();
      });

      $(".header-nav").delegate('li.has-custommenu > a','mouseover hover click', function () {
          var menuDom  =  $(this).parents('li.has-custommenu');
          initCustomMenu(menuDom);
          if(!menuDom.hasClass('menuopen')){
              menuDom.addClass('menuopen');
          } else {
              menuDom.removeClass('menuopen');
          }
          initApplicationsSwiper();
          initCaseappsSwiper();
      });

      $(".header-nav").delegate('li.has-custommenu','mouseleave', function () {
          if($(this).hasClass('menuopen')){
              $(this).removeClass('menuopen');
              initCustomMenu($(this));
          }
      });
  });
})(jQuery);
