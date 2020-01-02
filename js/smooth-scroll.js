$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
  if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
      &&
      location.hostname === this.hostname
  ){
    var target = $(this.hash);
    var navbarHeight = $('#navbar-clutchet').outerHeight();
    var scrollPoint;
    scrollPoint = target.offset().top - navbarHeight;
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: scrollPoint
      }, 1000);
    }
  }
});