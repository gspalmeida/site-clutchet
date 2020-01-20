<?php
// Função para validar contra mail injection
function IsInjected($str)
{
  $injections = array('(\n+)',
    '(\r+)',
    '(\t+)',
    '(%0A+)',
    '(%0D+)',
    '(%08+)',
    '(%09+)'
  );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
  {
    return true;
  }
  else
  {
    return false;
  }
}

//Validações dos dados de entrada
if(!isset($_POST['submit']))
{
  echo "<p>Erro de permissão, essa página não pode ser acessada diretamente.</p>";
  exit;
}

//Recebe os dados do POST
$name           = $_POST['nome'];
$phone          = $_POST['telefone'];
$visitor_email  = $_POST['email'];
$instagram      = $_POST['instagram'];
$message        = $_POST['mensagem'];
$msgRetorno     = [];

//Valida os campos obrigatórios do formulário
if(empty($name)||empty($phone)||empty($visitor_email)||empty($message))
{
  $msgRetorno = ['titulo'=>"Campos obrigatórios não foram preenchidos",
                 'mensagem'=>"Confira se digitou seu Nome, Email, Telefone e Mensagem.",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);
  exit;
}
//Valida contra email injection
if(IsInjected($name))
{
  $msgRetorno = ['titulo'=>"Seu contato foi barrado por se assemelhar a um mail injection!",
                 'mensagem'=>"Verifique os dados digitados e tente novamente!",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);
  exit;
}
if(IsInjected($visitor_email))
{
  $msgRetorno = ['titulo'=>"Seu contato foi barrado por se assemelhar a um mail injection!",
                 'mensagem'=>"Verifique os dados digitados e tente novamente!",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);
  exit;
}
if(IsInjected($phone))
{
  $msgRetorno = ['titulo'=>"Seu contato foi barrado por se assemelhar a um mail injection!",
                 'mensagem'=>"Verifique os dados digitados e tente novamente!",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);
  exit;
}
if(IsInjected($instagram))
{
  $msgRetorno = ['titulo'=>"Seu contato foi barrado por se assemelhar a um mail injection!",
                 'mensagem'=>"Verifique os dados digitados e tente novamente!",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);
  exit;
}

//require_once ('../vendor/autoload.php') ;
require_once ($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php') ;
//require_once ('/var/www/html/site-nucleodepericias/vendor/autoload.php') ;
//require_once ('/var/www/html/galileosoft.com.br/site-nucleodepericias/vendor/autoload.php') ;

use PHPMailer\PHPMailer\PHPMailer;

$mailer = new PHPMailer();
//Login no servidor SMTP
$mailer->IsSMTP();
$mailer->Host       = "smtp.galileosoft.com.br";
$mailer->SMTPAuth   = true;
$mailer->Port = 587;
$mailer->SMTPSecure = false;
$mailer->SMTPAutoTLS = false;
$mailer->Username = 'site@clutchet.com.br';
$mailer->Password = 'dicaSalt!01';
//Pessoa que ENVIA o email
$mailer->Sender = "contato@clutchet.com.br"; //Email que envia
$mailer->From = "contato@clutchet.com.br"; //Email que aparece pra quem recebe
$mailer->FromName = "Lead do Site -".$name; //Nome que aparece pra quem recebe
//Pessoa que RECEBE o email
$mailer->addAddress('contato@clutchet.com.br');
//Para onde RESPONDER o email
$mailer->addReplyTo($visitor_email, 'Olá, '.$name);
//Escreve o Email
$mailer->CharSet = 'UTF-8';
$mailer->isHTML(true);
$mailer->Subject = "Novo Lead Site - " . $name;
$mailer->Body = "<p>Você teve uma nova submissão no site.</p><br/>
                    <p><strong>Nome: </strong>".$name."</p>
                    <p><strong>Telefone: </strong>".$phone."</p>
                    <p><strong>Email: </strong>".$visitor_email."</p>
                    <p><strong>Instragram:</strong>" . $instagram . "</p>
                    <p><strong>Mensagem:</strong><br/>".$message."</p>";

$enviado = $mailer->send();
$mailer->ClearAllRecipients();


if (!$enviado){
  $msgRetorno = ['titulo'=>"Pedimos desculpa, mas correu um erro durante o envio do seu formulário, por favor tente novamente!",
                 'mensagem'=>"Caso o problema persista, entre em contato via WhatsApp ou Ligação e estaremos de prontidão para lhe ajudar",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);

  $reporter = new PHPMailer();
  //Login no servidor SMTP
  $reporter->IsSMTP();
  $reporter->Host       = "smtp.galileosoft.com.br";
  $reporter->SMTPAuth   = true;
  $reporter->Port = 587;
  $reporter->SMTPSecure = false;
  $reporter->SMTPAutoTLS = false;
  $reporter->Username   = 'gustavo@galileosoft.com.br';
  $reporter->Password   = '123321ikariam';
  //Pessoa que ENVIA o email
  $reporter->Sender = "contato@galileosoft.com.br"; //Email que envia
  $reporter->From = "contato@galileosoft.com.br"; //Email que aparece pra quem recebe
  $reporter->FromName = "Site Clutchet"; //Nome que aparece pra quem recebe
  //Pessoa que RECEBE o email
  $reporter->addAddress('contato@galileosoft.com.br');
  //Escreve o Email
  $reporter->CharSet = 'UTF-8';
  $reporter->isHTML(true);
  $reporter->Subject = "Erro no Formulário - Clutchet";
  $reporter->Body = "<p>O seguinte contato do site não foi enviado:</p><br/>
                    <p><strong>Nome: </strong>".$name."</p>
                    <p><strong>Telefone: </strong>".$phone."</p>
                    <p><strong>Email: </strong>".$visitor_email."</p>
                    <p><strong>Assunto:</strong>" . $instagram . "</p>
                    <p><strong>Mensagem:</strong><br/>".$message."</p>
                    <p><br/><br/><br/><strong>Erro:</strong><br/>".$enviado."</p>";

  $falha = $reporter->send();
  $reporter->ClearAllRecipients();
  exit;
}else{
  $msgRetorno = ['titulo'=>"Sua mensagem foi enviada com Sucesso!",
                 'mensagem'=>"O Núcleo de Perícias agradece pelo seu contato.",
                 'tipo'=>"sucesso"];
  echo json_encode($msgRetorno);
  exit;
}

//Debug
//$mailer->SMTPDebug = 4;
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);


