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
//Envia Form Modal Contato
function enviaFormModalContato() {
  var validado = 1;
  $("form#modalContato-form > div > input, form#modalContato-form > div > textarea").each(function () {
    if(this.value==""){
      toastr.error('Um campo obrigatório nao foi preenchido!', 'Confira se digitou seu Nome, Telefone e Mensagem');
      validado  = 0;
      return false
    }
  });
  if (validado === 1){
    ShowLoader();
    var formData = $("#modalContato-form").serializeArray();
    var dataObj = {};
    $(formData).each(function(i, field){
      dataObj[field.name] = field.value;
    });
    dataObj["submit"] = 'ok';

    $.ajax({
      type: "POST",
      url: "php/handlerModalForm.php",
      data: dataObj,
      dataType: "json",
      success: function (data) {
        if(data.tipo==="sucesso"){
          HideLoader();
          toastr.success(data.mensagem,data.titulo);
        }
        else{
          HideLoader();
          toastr.error(data.mensagem,data.titulo);
        }
      }
    });
  }
}