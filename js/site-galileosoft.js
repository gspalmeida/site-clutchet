//Animação do Hamburger Button
$(function () {
  $('.first-button').on('click', function () {

    $('.animated-icon1').toggleClass('open');
  });
  $('.second-button').on('click', function () {

    $('.animated-icon2').toggleClass('open');
  });
  $('.third-button').on('click', function () {

    $('.animated-icon3').toggleClass('open');
  });
});
//Scripts para fazer o fadeOut e fadeIn dos slides de home-serviços (foi necessário criar duas functions separadas
// devido a viewBase aparecer só uma vez, e mudar o navegador ao mudar de view)
function trocaView(elementoQueSai, elementoQueEntra) { //Troca viewBase para viewCorpo
  $(elementoQueSai).addClass('fadeOut animated');
  $(elementoQueSai).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $(elementoQueSai).addClass('hideSection');
    $(elementoQueSai).removeClass('fadeOut animated');
    $(elementoQueEntra).removeClass('hideSection');
    $(elementoQueEntra).addClass('fadeIn animated');
    $(elementoQueSai).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
  });
  $(elementoQueEntra).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $(elementoQueSai).removeClass('fadeIn animated');
    $(elementoQueEntra).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
  });
}
function trocaServico(elementoQueSai, elementoQueEntra) { //Troca de serviço ativo dentro da viewCorpo
  if($(elementoQueEntra).hasClass('viewAtiva')===false){
    $(elementoQueSai).addClass('fadeOut animated');
    $(elementoQueSai).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(elementoQueSai).addClass('hideSection');
      $(elementoQueSai).removeClass('fadeOut animated viewAtiva');
      $(elementoQueEntra).removeClass('hideSection');
      $(elementoQueEntra).addClass('fadeIn animated viewAtiva');
      $(elementoQueSai).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
    });
    $(elementoQueEntra).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(elementoQueSai).removeClass('fadeIn animated');
      $(elementoQueEntra).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
    });
  }
}
