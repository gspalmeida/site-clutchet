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

            //SCRIPTS DESATUALIZADOS MAS QUE TALVEZ POSSAM SER USADOS
// //    ScrolSpy da Navbar
// var pagina = window.location.pathname;
// var start = pagina.lastIndexOf("/");
// var stop = pagina.lastIndexOf(".");
// if(pagina.substr(start+1,stop-start-1)==='') {
//     $(document).ready(function () {
//         $('#navbar-index').addClass('active');
//     });
// }else{
//     $(document).ready( function () {
//         $('#navbar-' + pagina.substr(start + 1, stop - start - 1)).addClass('active');
//     });
// }
// //    ScrollToTop Navbar
// function scrollToTop() {
//     $('body, html').animate({scrollTop: 0});
// }