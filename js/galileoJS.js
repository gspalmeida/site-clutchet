//Ativa as animações em dispositivos de tela grande
var largura = screen.width;
if( largura >= 768 ){
    // Animations init
    new WOW().init();
}
//Faz os includes
$(function(){
    var includes = $('[data-include]');
    jQuery.each(includes, function(){
        var file = $(this).data('include') + '.html';
        $(this).load(file);
    });

});
//Verifica se os includes foram adicionados
function checkInclude() {
    var checkInclude = document.getElementById('checkInclude');
    if(checkInclude){
        return true
    }
    else{
        return false
    }
}
//ScrolSpy da Navbar
$(document).ready(function scrollSpy() {
    if(checkInclude() === true){
        var pagina = window.location.pathname;
        var start = pagina.lastIndexOf("/");
        var stop = pagina.lastIndexOf(".");
        if(pagina.substr(start+1,stop-start-1)==='') {
            $(document).ready(function () {
                $('#navbar-index').addClass('active');
            });
        }else{
            $(document).ready( function () {
                $('#navbar-' + pagina.substr(start + 1, stop - start - 1)).addClass('active');
            });
        }
    }
    else {
        setTimeout(scrollSpy,1);
    }
});
//ScrollToTop Navbar
function scrollToTop() {
    $('body, html').animate({scrollTop: 0},1000);
}
//TODO futuramente passar um ID para scrollar até ele
function scrollToSection() {
    var position = $('#navegacao-principal').height()-10;
    $('html, body').animate({
        scrollTop: position
    }, 1000)
}
//Script para fazer o fadeOut e fadeIn dos slides
function trocaSlide(elementoQueSai, elementoQueEntra) {
    $(elementoQueSai).addClass('zoomOut animated');
    $(elementoQueSai).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(elementoQueSai).addClass('hideSection');
        $(elementoQueSai).removeClass('zoomOut animated');
        $(elementoQueEntra).removeClass('hideSection');
        $(elementoQueEntra).addClass('zoomIn animated');
        $(elementoQueSai).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
    });
    $(elementoQueEntra).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(elementoQueSai).removeClass('zoomIn animated');
        $(elementoQueEntra).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
    });
    scrollToTop();
}
//    Abre a modal de cursos com a Respectiva TAB ativa
function escolheTabAtiva(nomeDaTab,nomeDaModal){
    var tabAtiva;
    var modalAtiva;
    var tabAtivaFinal;
    tabAtiva = document.getElementsByClassName(nomeDaTab);
    $(tabAtiva).addClass('active show');
    modalAtiva = document.getElementById(nomeDaModal);
    $(modalAtiva).on('hidden.bs.modal', function(){
        tabAtivaFinal = document.getElementsByClassName('active show');
        $(tabAtivaFinal).removeClass('active show');
    });
}
// Radio Card
$("[data-card-type='radio-card']").on('click',function () {
  var cardGroup = $(this).attr("data-card-group");
  $("[data-card-group='"+cardGroup+"']:not(.radio-card-active) div.radio-card-icon").addClass('d-none').removeClass('active');
  $(this).addClass('radio-card-active');
  $("[data-card-group='"+cardGroup+"'].radio-card-active div.radio-card-icon").removeClass('d-none').addClass('active');
  $(this).removeClass('radio-card-active');
});
//Loader para Envio de Forms
function ShowLoader() {
  var overlay = jQuery(
    '<div id="loading-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.6); z-index: 10000;">' +
    '   <div style="text-align: center; width: 100%; position: absolute; top: 40%; margin-top: -50px;"> ' +
    '       <div class="preloader-wrapper big active"> ' +
    '           <div class="spinner-layer spinner-blue"> ' +
    '              <div class="circle-clipper left"> ' +
    '                 <div class="circle"></div> ' +
    '              </div>' +
    '              <div class="gap-patch"> ' +
    '                 <div class="circle"></div> ' +
    '              </div>' +
    '              <div class="circle-clipper right"> ' +
    '                 <div class="circle"></div> ' +
    '              </div> ' +
    '           </div> ' +
    '           <div class="spinner-layer spinner-red"> ' +
    '               <div class="circle-clipper left"> ' +
    '                   <div class="circle"></div> ' +
    '               </div>' +
    '               <div class="gap-patch"> ' +
    '                   <div class="circle"></div> ' +
    '               </div>' +
    '               <div class="circle-clipper right"> ' +
    '                   <div class="circle"></div> ' +
    '               </div> ' +
    '           </div> ' +
    '           <div class="spinner-layer spinner-yellow"> ' +
    '               <div class="circle-clipper left"> ' +
    '                   <div class="circle"></div> ' +
    '               </div>' +
    '               <div class="gap-patch">  ' +
    '                   <div class="circle"></div> ' +
    '               </div>' +
    '               <div class="circle-clipper right"> ' +
    '                   <div class="circle"></div> ' +
    '               </div> ' +
    '           </div> ' +
    '           <div class="spinner-layer spinner-green"> ' +
    '               <div class="circle-clipper left"> ' +
    '                   <div class="circle"></div> ' +
    '               </div>' +
    '               <div class="gap-patch"> ' +
    '                   <div class="circle"></div> ' +
    '               </div>' +
    '               <div class="circle-clipper right"> ' +
    '                   <div class="circle"></div> ' +
    '               </div> ' +
    '           </div> ' +
    '       </div> ' +
    '   </div> ' +
    '</div>');
  overlay.appendTo(document.body);
}
function HideLoader() {
  $('#loading-overlay').remove();
}