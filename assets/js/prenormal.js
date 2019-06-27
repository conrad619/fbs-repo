
var url = $(location).attr('href'),
parts = url.split("/"),
last_part = parts[parts.length-1];

$(document).ready(function(){

	$("body").append("<div class='ismobile'></div>");
	$("body").append("<div class='isSafari'></div>");

  	/*var windowWidth = window.screen.width < window.outerWidth ?
                  window.screen.width : window.outerWidth;
	var mobile = windowWidth <= 768;*/
	


    var swapped=false;
    var mobile = detectMobile();
	if(mobile){

	    if(last_part.match(/index/g)){			
			setTimeout(function(){ $(".pop_up_sub_center").show(); }, 30000);
		}else{
			setTimeout(function(){  $(".pop_up_sub_bottom").show(); }, 30000);
		}

		if(!swapped){
			var lvl2 = $(".home_level_2").html();
			$(".home_level_2").html($(".home_level_5").html());
			$(".home_level_5").html(lvl2);
			//swap class
			$(".home_level_2").addClass("swap1");
			$(".home_level_5").addClass("swap2");
			$(".swap1").removeClass("home_level_2");
			$(".swap2").removeClass("home_level_5");
			$(".swap2").addClass("home_level_2");
			$(".swap1").addClass("home_level_5");
			swapped=true;
		}

		//bottom pop up
	  	var scrolledUp = false;
	  	var timeout = setTimeout(function(){},0);

	  	if(!last_part.match(/index/g)){	
			window.onscroll = function(e) {
				// print "false" if direction is down and "true" if up
				var scrollUp = this.oldScroll > this.scrollY
				// console.log(scrollUp);

				if(scrollUp && !scrolledUp){
					$(".pop_up_sub_bottom").show();			
				}else if(!scrollUp && !$('.subscription_m *').is(":focus")){
					$(".pop_up_sub_bottom").hide();
					scrolledUp=false;
				}

				this.oldScroll = this.scrollY;

				clearTimeout(timeout);  
			    timeout = setTimeout(function() {
			        // do your stuff
			        if(scrolledUp && !$('.subscription_m *').is(":focus")){
						$(".pop_up_sub_bottom").hide();

			        }
			        if(scrollUp){
						scrolledUp = true;
					}
			    }, 300);
			}

			if(last_part.match(/latest_news_article2/g)){	
				$(location).attr('href', window.location.href.match(/^.*\//)+"latest_news_article1.html");
			}

			if(last_part.match(/star-track_article2/g)){	
				$(location).attr('href', window.location.href.match(/^.*\//)+"star-track_article1.html");
			}

		}

		
		//safari detection
		

	}
	//end mobile initialized
	desktopSetting();
	if(mobile){
	    mobileSetting();    
		
	}
	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if(true){
		$('img').each(function(index){
			if($(this).hasClass('saf') || $(this).hasClass('card-fade')){
				var src = $(this).attr('src');
				var classes = $(this).attr('class');
				var ids = $(this).attr('id');
				var bacs = $(this).css("object-fit");
				var bacp = $(this).css("object-position");
				$(this).replaceWith("<div class='safimg "+classes+"' id='"+ids+"' style='background-image:url(./"+src+");background-size:"+bacs+";background-position:"+bacp+";'>"
					+"</div>");
			}

		});
	}
	
	var slicked=false;
    $( window ).resize(function() {
		mobile = detectMobile();
    	if(mobile){
    		if(!slicked){
    			$('.card_slider_m').not('.slick-initialized').slick({
				  dots: false,
				  infinite: true,
				  speed: 300,
				  slidesToShow: 1,
				  centerMode: false,
				  variableWidth: true,
				  nextArrow:'',
				  prevArrow:''
				});


			 	$('.home_slider').not('.slick-initialized').slick({
				  dots: true,
				  infinite: true,
				  speed: 300,
				  slidesToShow: 1,
				  centerMode: false,
				  nextArrow:'',
				  prevArrow:''

				});

				slicked=true;

	    	}

		 	if($('.star_track_slider').hasClass('slick-initialized')){
				$('.star_track_slider').slick('unslick');
		 	}

	    	if(last_part.match(/latest_news_article2/g)){	
				$(location).attr('href', window.location.href.match(/^.*\//)+"latest_news_article1.html")
			}
			if(last_part.match(/star-track_article2/g)){	
				$(location).attr('href', window.location.href.match(/^.*\//)+"star-track_article1.html")
			}
		}else{

			if(slicked){
				$('.card_slider_m').slick('unslick');
				$('.home_slider').slick('unslick');
				$('.star_track_slider').not('.slick-initialized').slick({
				  dots: true,
				  infinite: true,
				  speed: 300,
				  slidesToShow: 1,
				  centerMode: false,
				  variableWidth: true,
				  nextArrow:'<img src="assets/images/pages/homepage/right-arrow-button.svg" class="slick-next">',
				  prevArrow:''
				});
				slicked=false;

		    }


		}
	});




	


	//remove card in latest news article 2
	if(last_part.match(/latest_news_article2/g)){		
	
		if($(window).height()<=1050){
			$('.aside .related_card .articles .article_box:last-child').remove();	
			if($(window).height()<=946){
				$('.aside .card_holder > .card:last-child').remove();

			}

		}
	}

	if(last_part.match(/star-track/g)){		
		$(".slick-list draggable").on('hover',function(){
			if($(window).width()>=1752){
				$(".star_track .slick-slide:nth-child(6) .yellow-card").css("filter","brightness(40%)");		
			}else{
				$(".star_track .slick-slide").each(function(){
					if($(this).attr('data-slick-index')==3){
						$(this).css("filter","brightness(40%)");
					}		
				})
			}
		});
	}
	//scroll to top button
	$("#scrollToTop").click(function() {
	  $("html, body").animate({ scrollTop: 0 }, "slow");
	  return false;
	});

	//stop scroll when opening search button
	var scrollPosition=0;
	var enabled = false;
	var current = $(window).scrollTop();
	$(".navigation .pointer").click(function(){
		if($(".navigation .search_box .drop_box").hasClass("hide")){
			$(".navigation .search_box .drop_box").removeClass("hide");
			$(".navigation .search_button").addClass("hide");
			$(".navigation .search_close").removeClass("hide");
			$(".drop_box_overlay").removeClass("hide");
			enabled = true;
			current = $(window).scrollTop();
			$("body").css("overflow","hidden");
		}else{
			$(".navigation .search_box .drop_box").addClass("hide");
			$(".navigation .search_button").removeClass("hide");
			$(".navigation .search_close").addClass("hide");
			$(".drop_box_overlay").addClass("hide");
			enabled = false;
			$("body").css("overflow","auto");
		}

	});

	$(document).on('click','.menu_m,#menu_m',function(){
		// alert();
		if($(".navigation .search_box_m .drop_box_m").hasClass("hide")){
			$(".navigation .search_box_m .drop_box_m").removeClass("hide");
			$(".navigation .search_box_m .menu_m").addClass("hide");
			$(".navigation .search_box_m .menu_m.menu_close").removeClass("hide");
			// enabled = true;
			// current = $(window).scrollTop();
			$("body").css("overflow","hidden");
		}else{
			$(".navigation .search_box_m .drop_box_m").addClass("hide");
			$(".navigation .search_box_m .menu_m").removeClass("hide");
			$(".navigation .search_box_m .menu_m.menu_close").addClass("hide");
			// enabled = false;
			$("body").css("overflow","auto");
		}
	});

	
	$(window).scroll(function() {
		if(enabled)
	    	$(window).scrollTop(current);
	});

	//pop up functions
	$(".pop_up_sub_bottom .pop_up_close").click(function(){
		$(".pop_up_sub_bottom").hide();
	});

	$(".pop_up_sub_center .pop_up_close").click(function(){
		$(".pop_up_sub_center").hide();
	});

	emailValidator("#subscriptionForm");
	emailValidator("#subscriptionFormAside");
	emailValidator("#subscriptionForm_mb");
	emailValidator("#subscriptionForm_mb_center");
	emailValidator("#nav_sub_m");
	

	var current_video = "";
	$('.vid a',this).click(function(e){ e.preventDefault()});

	$('.vid').click(function(){
		$('.video_player_holder',this).removeClass('hide');
		
		current_video = $('.video_play_content',this).html();

		$('.play_video_here').html(current_video);
		$('.play_video_here').css("display","block");
		$('.play_video_here .video_player_holder .video_container video').trigger('play');
		$('.video_play_content').html('');

	});

	$('.play_video_here').click(function(e){

		$('.play_video_here .video_player_holder .video_container video').trigger('pause');
		$(this).css("display","none");
		$('.video_play_content').html(current_video);
		$(this).html("");
		$('.video_player_holder').addClass('hide');
		
	});

	//featured player svg zoom adjustment
	var dwidth = $('.player_clip image').attr("width");
	var dheight = $('.player_clip image').attr("height");
	$('.player_clip image').hover(function(){
		// $(this).attr("x","-20");
		// $(this).attr("width",parseFloat(dwidth)+(dwidth*.1));
		// $(this).attr("height",parseFloat(dheight)+(dheight*.1));
		$({cx:$('.player_clip image').attr('x')})
	    .animate(
		    {cx: -20},
		    {duration:1000,step:function(now){$('.player_clip image').attr('x', now);
		}});

	  	$({cx:$('.player_clip image').attr('width')})
	    .animate(
		    {cx: parseFloat(dwidth)+(dwidth*.1)},
		    {duration:1000,step:function(now){$('.player_clip image').attr('width', now);
		}});

	 	$({cy:$('.player_clip image').attr('height')})
	    .animate(
		    {cy: parseFloat(dheight)+(dheight*.1)},
		    {duration:1000,step:function(now){$('.player_clip image').attr('height', now);
		}});
	},function(){
		$(this).attr("x","0");
		$(this).attr("width",dwidth);
		$(this).attr("height",dheight);

	});


	$(".img_holder").hover(function(){
		var curh = $(".img",this).height()
		$(this).css("max-height",curh);
	});

	

});

function mobileSetting(){
	
	var initSlide = 0;
	if(last_part.match(/siao-mates_article/g)){	
		initSlide=2;
	}else if(last_part.match(/trickster-tipster_article/g)){
		initSlide=1;	
	}else if(last_part.match(/star-track_article1/g)){
		initSlide=3;
	}
	

	$('.card_slider_m').slick({
		initialSlide:initSlide,
	  dots: false,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  centerMode: false,
	  variableWidth: true,
	  nextArrow:'',
	  prevArrow:'',
	  responsive:[

	  	{
	  		breakpoint:9999,
	  		settings:"unslick"
	  	},
	  	{
	  		breakpoint:767,
	  		settings:{
	  			dots: false,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				centerMode: false,
				variableWidth: true,
	  		}
	  	}
	  ]

	});
	

	$('.home_slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  centerMode: false,
	  nextArrow:'',
	  prevArrow:'',
	  responsive:[

	  	{
	  		breakpoint:9999,
	  		settings:"unslick"
	  	},
	  	{
	  		breakpoint:767,
	  		settings:{
			  dots: true,
			  infinite: true,
			  speed: 300,
			  slidesToShow: 1,
			  centerMode: false
	  		}
	  	}
	  ]

	});

	
 	if($('.star_track_slider').hasClass('slick-initialized')){
		$('.star_track_slider').slick('unslick');
 	}
}

function desktopSetting(){

  	$('.card_slider').slick({
	  dots: false,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  centerMode: false,
	  variableWidth: true,
	  nextArrow:'<img src="assets/images/pages/homepage/right-arrow-button.svg" class="slick-next">',
	  prevArrow:''
	});


	$('.star_track_slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  centerMode: false,
	  variableWidth: true,
	  nextArrow:'<img src="assets/images/pages/homepage/right-arrow-button.svg" class="slick-next">',
	  prevArrow:''
	});
}

function detectMobile(){
	var mobile = false;
	if($(".ismobile").css("display")=="block"){
		mobile=true;
	}

	return mobile;
}

function checkValidEmail(element,target){
	var v = $(element).valid();
	if(v){
		$(target+" .email_warning").css("display","none");
	}else{
		$(target+" .email_warning").css("display","block");

	}
}

function emailValidator(em){
	$(em).validate({
		onkeyup: function(element) {
			if($(".subscription_email "+em+" .email_warning").css("display") == "block")
				checkValidEmail(element,em);
		},
		errorPlacement: function(error, element) {
        
	        // name attrib of the field
			var n = element.attr("name");
	    
			if (n == "email"){
				
				$(".subscription_email "+em+" .email_warning").css("display","block");
				error.insertAfter(element);
			}
			
	            
	    },
		rules:{
			email:{
				required:true,
				email:true
			}
		},
		messages:{
			email:"Please enter a valid email address."
		},
		submitHandler: function(form, event) { 
		    event.preventDefault();

			var url = 'subscription.php';

			//for testing purpose
			//remove this once url php is set
			$(".subscription_email .sub_container").addClass("hide");
			$(".subscription_email > p").addClass("hide");
			$(".subscription_email .success").removeClass("hide");

			$.ajax({
				type: "POST",
				url: url,
				data: form.serialize(),
				success: function(data)
				{
					$(em)[0].reset();
					$(".subscription_email .sub_container").addClass("hide");
					$(".subscription_email > p").addClass("hide");
					$(".subscription_email .success").removeClass("hide");
				}
			});
		}
	});
}