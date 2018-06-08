<?php

    $name = $_POST['user-name'];
    $phone = $_POST['user-phone'];
    $street = $_POST['user-street'];
    $adress = $_POST['user-adress'];
    $block = $_POST['user-block'];
    $apartment = $_POST['user-apartment'];
    $floor = $_POST['user-floor'];
    $comment = $_POST['user-comment'];
    $pay = $_POST['user-pay'];

    $callback = $_POST['user-callback'];
    $callback = isset($callback) ? 'Нет' : 'Да';

    $mail_message ='
    <html>
        <head>
            <title>Заявка</title>
        </head>    
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: ' . $name .'</li>
                <li>Телефон: ' . $phone .'</li>
                <li>Улица: ' . $street .'</li>
                <li>Дом: ' . $adress .'</li>
                <li>Корпус: ' . $block .'</li>
                <li>Квартира: ' . $apartment .'</li>
                <li>Этаж: ' . $floor .'</li>
                <li>Комментарий: ' . $comment .'</li>
                <li>Оплата: ' . $pay .'</li>
                <li>Не перезванивать: ' . $callback .'</li>
            </ul>    
        </body>
    </html>
    ';

    $headers = "From: Администратор сайта <admin@loftschool.com>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";
    

    $mail = mail('fashic@bk.ru', 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка"
    }

    echo json_encode($data);

?>