$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
  console.log('entrou no script');
  if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
      &&
      location.hostname === this.hostname
  ){
    console.log('entrou no if');
    var target = $(this.hash);
    var navbarHeight = $('#navbar-clutchet').outerHeight();
    var scrollPoint;
    scrollPoint = target.offset().top - navbarHeight;
    console.log('navbarHeight');
    console.log(navbarHeight);
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: scrollPoint
      }, 1000);
    }
  }
});