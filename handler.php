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
$name = $_POST['nome'];
$visitor_email = $_POST['email'];
$phone = $_POST['DDD'].$_POST['telefone'];
$subject = $_POST['assunto'];
$message = $_POST['mensagem'];
$msgRetorno = [];

//Valida os campos obrigatórios do formulário
if(empty($name)||empty($visitor_email)||empty($phone)||empty($message))
{
  $msgRetorno = ['titulo'=>"Campos obrigatórios não foram preenchidos",
                 'mensagem'=>"Confira se digitou seu Nome, Email, Telefone e Mensagem",
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
if(IsInjected($subject))
{
  $msgRetorno = ['titulo'=>"Seu contato foi barrado por se assemelhar a um mail injection!",
                 'mensagem'=>"Verifique os dados digitados e tente novamente!",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);
  exit;
}
//Trata os Forms sem Asunto
if (empty($subject)){
  $subject = "Contato";
}

require_once './vendor/autoload.php';

$mailer = new PHPMailer();

//Login no servidor SMTP
$mailer->IsSMTP();
$mailer->Host       = "smtp.galileosoft.com.br";
$mailer->SMTPAuth   = true;
$mailer->Port = 587;
$mailer->SMTPSecure = false;
$mailer->SMTPAutoTLS = false;
$mailer->Username   = 'gustavo@galileosoft.com.br';
$mailer->Password   = '123321ikariam';

//Pessoa que ENVIA o email
$mailer->Sender = "nucleodepericias@galileosoft.com.br"; //Email que envia
$mailer->From = "comercial@nucleodepericias.com.br"; //Email que aparece pra quem recebe
$mailer->FromName = "Núcleo de Perícias"; //Nome que aparece pra quem recebe

//Pessoa que RECEBE o email
$mailer->addAddress('comercial@nucleodepericias.com.br');

//Para onde RESPONDER o email
$mailer->addReplyTo($visitor_email, $name);

//Escreve o Email
$mailer->CharSet = 'UTF-8';
$mailer->isHTML(true);
$mailer->Subject = "Site Núcleo de Perícias - ".$subject;
$mailer->Body = "<p>Você teve uma nova submissão no site.</p><br/>
                    <p><strong>Nome: </strong>".$name."</p>
                    <p><strong>Telefone: </strong>".$phone."</p>
                    <p><strong>Email: </strong>".$visitor_email."</p>
                    <p><strong>Assunto:</strong>".$subject."</p>
                    <p><strong>Mensagem:</strong><br/>".$message."</p>";

$enviado = $mailer->send();

$mailer->ClearAllRecipients();

if (!$enviado){
  $msgRetorno = ['titulo'=>"Pedimos desculpa, mas correu um erro durante o envio do seu formulário, por favor tente novamente!",
                 'mensagem'=>"Caso o problema persista, entre em contato via WhatsApp ou Ligação e estaremos de prontidão para lhe ajudar",
                 'tipo'=>"erro"];
  echo json_encode($msgRetorno);
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


