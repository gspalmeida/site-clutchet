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

//Validações e ajustes para os forms
//Adiciona mascara ao telefone
function mascaraTelefone(tel){
  if(mascaraInteiro(tel)===false){
    event.returnValue = false;
  }
  return formataCampo(tel, '00 0 0000-0000', event);
}
//Valida numero inteiro com mascara
function mascaraInteiro(){
  if (event.keyCode < 48 || event.keyCode > 57){
    event.returnValue = false;
    return false;
  }
  return true;
}
//Formata de forma generica os campos
function formataCampo(campo, Mascara, evento) {
  var boleanoMascara;
  var digitado = evento.keyCode;
  exp = /\-|\.|\/|\(|\)| /g;
  campoSoNumeros = campo.value.toString().replace( exp, "" );
  var posicaoCampo = 0;
  var NovoValorCampo="";
  var TamanhoMascara = campoSoNumeros.length;
  if (digitado != 8) { // backspace
    for(i=0; i<= TamanhoMascara; i++) {
      boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") || (Mascara.charAt(i) == "/"));
      boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(") || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "));
      if (boleanoMascara) {
        NovoValorCampo += Mascara.charAt(i);
        TamanhoMascara++;
      }else {
        NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
        posicaoCampo++;
      }
    }
    campo.value = NovoValorCampo;
    return true;
  }else {
    return true;
  }
}
function isNumber(evt) {
  var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
  if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
    return false;
  return true;
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