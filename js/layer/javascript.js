//判断手机端
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	isAndroid = ua.match(/(Android)\s+([\d.]+)/),
	isMobile = isIphone || isAndroid || ipad;

var new_scroll_position = 0;
var last_scroll_position;

window.addEventListener('scroll', function(e) {
	last_scroll_position = window.pageYOffset;//window.scrollY/window.pageYOffset
	if (new_scroll_position < last_scroll_position && last_scroll_position > 50) {
		$(".header").removeClass("scroll-top").addClass("scroll-down");
	} else if (new_scroll_position > last_scroll_position) {
		$(".header").removeClass("scroll-down").addClass("scroll-top");
	}

	var targetTop = $(this).scrollTop();
	if(targetTop <= 0){
		$(".header").removeClass("scroll-top").removeClass("scroll-down");
	}
	new_scroll_position = last_scroll_position;
});


jQuery(document).ready(function() {

	if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
		new WOW().init();
	};

	//返回顶部
	$('.return-top').on("click", function () {
		$("html,body").animate({scrollTop:0}, 500);
	});

	//客户留言
	$(".click-message").click(function () {
		$(".message-bg").fadeIn();
	});
	$(".message-close").click(function () {
		$(".message-bg").fadeOut();
	});
 

	var hasdetail = $('html').hasClass("detail");
	$('.search a').on('click', function(){
		$('html').addClass("detail");
		$('.header').addClass("searchshow");
		$('.search-input').focus();
	});	
	$('.search-show .close').on('click', function(){
		if(hasdetail==false){
			$('html').removeClass("detail");
		}
		$('.header').removeClass("searchshow");
	});

	if(hasdetail==false){
		$(".header .header-nav .has-custommenu,.header .header-nav .has-custommenu *,.header .header-nav .has-sub,.header .header-nav .has-sub *").hover(function(){
			$("html").addClass('detail'); 
		}, function() {
			$("html").removeClass('detail');  
		});
	}

});
