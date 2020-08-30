<?php
include_once('db.php');

if ($_POST['col']) {
    $conditions = ['=', '>', '<'];
    $sql = mysqli_query($link, "SELECT * FROM `spa` WHERE '".$_POST['col']."' '".$conditions[$_POST['cond']]."'");
    if ($_POST['cond'] == 3) {
        $sql = mysqli_query($link, "SELECT * FROM `spa` WHERE `".$_POST['col']."` ".$conditions[$_POST['cond']]." LIKE '%".$_POST['val']."%' ORDER BY `".$_POST['col']."` ASC");
    } else {
        $sql = mysqli_query($link, "SELECT * FROM `spa` WHERE `".$_POST['col']."` ".$conditions[$_POST['cond']]." '".$_POST['val']."' ORDER BY `".$_POST['col']."` ASC");
    }
    $result = [];
    while ($res = mysqli_fetch_array($sql)) {
//        echo '1';
        $arr = [
            'date' => $res['date'],
            'name' => $res['name'],
            'count' => $res['count'],
            'distance' => $res['distance']            
        ];
//        $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
        array_push($result, $arr);
    }
    $json_result = json_encode($result, JSON_UNESCAPED_UNICODE);
    echo $json_result;
//    echo "SELECT * FROM `spa` WHERE `".$_POST['col']."` ".$conditions[$_POST['cond']]." '".$_POST['val']."' ORDER BY `".$_POST['col']."` ASC LIMIT 10";
}

if ($_POST['num']) {
    $from = $_POST['pag_limit'] * ($_POST['num'] - 1) + 1;
    $sql = mysqli_query($link, "SELECT * FROM `spa` ORDER BY `date` ASC LIMIT $from, ".$_POST['pag_limit']."");
    $result = [];
    while ($res = mysqli_fetch_array($sql)){
        $arr = [
            'date' => $res['date'],
            'name' => $res['name'],
            'count' => $res['count'],
            'distance' => $res['distance']            
        ];
         array_push($result, $arr);
    }
    $json_result =  json_encode($result, JSON_UNESCAPED_UNICODE);
    echo $json_result;
}
