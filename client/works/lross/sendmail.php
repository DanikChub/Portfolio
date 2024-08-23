<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('botvanech1@gmail.com', 'Ваш Клиент');
//Кому
$mail->addAddress('botvanech1@gmail.com');
//Тема
$mail->Subject = 'Это письмо от вашего клиента!';

//Тело письма
$body = '<h1 style="color: blue;
                    font-size: 50px;">Ответьте мне!</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p style="font-size: 30px"><strong>Имя: </strong>'.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['surname']))){
    $body.='<p style="font-size: 30px"><strong>Фамилия: </strong>'.$_POST['surname'].'</p>';
}

if(trim(!empty($_POST['email']))){
    $body.='<p style="font-size: 30px"><strong>Электронная почта: </strong>'.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['phone']))){
    $body.='<p style="font-size: 30px"><strong>Телефон: </strong>'.$_POST['phone'].'</p>';
}

if(trim(!empty($_POST['message']))){
    $body.='<p style="font-size: 30px"><strong>Сообщение: </strong>'.$_POST['message'].'</p>';
}


$mail->Body = $body;

//отправкка
if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);















