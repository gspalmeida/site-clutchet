//Padding Para a Navbar nao Sobrepor o Conteudo
function setPadding() {
  if($('#navbar-clutchet').length === 1){
    $('body').css("padding-top",$('#navbar-clutchet').outerHeight());
  }
  else {
    setTimeout(setPadding,100)
  }
}
$(document).ready(setPadding());
$(window).resize(function () {
  setPadding();
});