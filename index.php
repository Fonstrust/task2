<?php

include_once 'elems/db.php';

$last_id = mysqli_query($link, "SELECT * FROM `spa` ORDER BY ID DESC LIMIT 1");

while ($res = mysqli_fetch_array($last_id)) {
    $max = $res['ID'];
}

$max_trs = 30;


$content = '<table id="spa_table" class="main-center-table">
<tr>
<th>Дата</th>
<th>Название</th>
<th>Количество</th>
<th>Расстояние</th>
</tr>
';

$sql = mysqli_query($link, "SELECT * FROM `spa` ORDER BY `date` ASC LIMIT ".$max_trs."");
$incr = 1;

while ($res = mysqli_fetch_array($sql)) {
    if ($incr % 2 == 0) {
        $class = 'gray';
    } else {
        $class = 'white';
    }
    $date = $res['date'];
    $name = $res['name'];
    $count = $res['count'];
    $distance = $res['distance'];
    
    $content .= "<tr class=\"$class\"><td>$date</td><td>$name</td><td>$count</td><td>$distance</td></tr>";
    
    $incr++;
}

$content .= '</table>';


$pag_pages_num = ceil($max/$max_trs);

$pag_footer = '';

for ($i = 0; $i < $pag_pages_num; $i++) {
    $it = $i + 1;
    $pag_footer .= "<div class=\"pagination-num\">$it</div>";
}


include_once 'elems/layout.php';
//Таблица должна иметь сортировку по всем полям кроме даты. Фильтрация должна быть в виде двух выпадающих списков и текстового поля:
//Выбор колонки, по которой будет фильтрация
//Выбор условия (равно, содержить, больше, меньше)
//Поле для ввода значения для фильтрации
//Таблица должна содержать пагинацию








     