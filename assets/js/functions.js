$(function(){
	smoothScroll(500);
	$(".hobby-popis").hide();
	toggleHobby(500);
	nextEdu();
	prevEdu();
	switchDots();
	scrollHobby();
	$("header h1").fitText(0.8, { minFontSize: '20px', maxFontSize: '72px' });
});


//smooth scroll
function smoothScroll (duration){
	$('a[href^="#"]').on('click', function(event){

		var target = $( $(this).attr('href') );

		if ( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, duration);
		}
	});
}

//scroll after opening hobby
function scrollHobby(){
	$(".hobby-container").click(function(){
					$("html, body").animate({
				scrollTop: $(".hobbies-container").offset().top},300);
	});
}

//toggles hobbies
function toggleHobby (dur){
	$(".hobby-container").click(function(){
		var $this = $(this),
		newTitle = $this.find('strong').text();
		doAction($this, newTitle,dur);

	});
}

//determines what action to do
function doAction($this, newTitle,dur){
	if ($this.hasClass("shadow") && $(".hobby-popis").is(":visible")) {
		$(".hobby-popis").slideUp(dur);
		$this.removeClass("shadow");
	}
	else if ($(".hobby-popis").is(":visible")) {
			$(".hobby-popis").hide();
			$(".hobby-container").removeClass("shadow");
			$(".hobby-"+newTitle).fadeIn(dur);
			$this.toggleClass("shadow");
	}
	else{
		$(".hobby-"+newTitle).slideToggle(dur);
		$this.toggleClass("shadow");
	}
}

//switches to next slide
function nextEdu(){
	$(".edu-next").on('click', function(){
		var $currentSlide = $('.edu-unit.active-edu');
		var i = $currentSlide.attr('data-edu-id');
		i++;
		if (i > 5) {
			i = 1;
		}
		var $nextSlide = $('#edu-'+i);
		$($currentSlide).removeClass('active-edu').removeClass('slide-right').removeClass('slide-left');
		$($nextSlide).addClass('active-edu');
		$($nextSlide).addClass('slide-right');
		changeDots(i)
	});
}

//switches to previous slide
function prevEdu(){
	$(".edu-prev").on('click', function(){
		var $currentSlide = $('.edu-unit.active-edu');
		var i = $currentSlide.attr('data-edu-id');
		i--;
		if (i < 1) {
			i = 5;
		}
		var $nextSlide = $('#edu-'+i);
		$($currentSlide).removeClass('active-edu').removeClass('slide-left').removeClass('slide-right');
		$($nextSlide).addClass('active-edu');
		$($nextSlide).addClass('slide-left');
		changeDots(i)

	});
}

function changeDots(i){
	var $dots = $(".edu-selector").children();
	var dotsNumber = $dots.length;
	$($dots).removeClass('active-selector');
	$($dots).eq(i-1).addClass('active-selector');


}

function switchDots(){
	$(".edu-selector span").on('click', function(){
		var $this = $(this);
		var $siblings = $this.parent().children();
		var numberOfSlides = $siblings.length;
		var position = $siblings.index($this);
		var active = $(".active-edu").attr('data-edu-id');
		$($siblings).removeClass('active-selector');
		$($this).addClass('active-selector');
		$(".edu-unit.active-edu").removeClass('active-edu').removeClass('slide-left').removeClass('slide-right');
		$(".edu-unit").eq(position).addClass('active-edu');

	});
}

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
