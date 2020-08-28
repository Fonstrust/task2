<?php
error_reporting(-1);
$host = 'a0365707.xsph.ru';
$user = 'a0365707_task';
$password = '5l8F88ny';
$dbname = 'a0365707_task';
$link = mysqli_connect($host, $user, $password, $dbname) or die ('Ошибка : ('. mysqli_connect_error($link) . ')');
?>