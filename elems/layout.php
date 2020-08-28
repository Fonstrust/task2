<! DOCTYPE html >
<html>
    <head>
        <meta charset="utf-8">
        <title>SPA таблица</title>
        <link rel="stylesheet" href="./main.css?<?=time()?>">
    </head>
    <body>
        <div class="wrapper">
            <div class="filter">
                <p>Фильтр</p>
                <form action="#" id="filter" class="filter-flex-container">
                    <label>
                        <p>Выбор колонки</p>
                        <select id="col">
                            <option value="name">Название</option>
                            <option value="count">Количество</option>
                            <option value="distance">Расстояние</option>
                        </select>
                    </label>
                    <label>
                        <p>Выбор условия</p>
                        <select id="cond">
                            <option value="equally">Равно</option>
                            <option value="more">Больше</option>
                            <option value="less">Меньше</option>
                            <option value="contain">Содержит</option>
                        </select>
                    </label>
                    <label>
                        <p>Значение</p>
                        <input type="text" id="val">
                    </label>
                    <input type="submit">
                </form>
            </div>
            <div class="table-pagination-wrapper">
                <?php
                echo $content;
                ?>
                <div id="pag_place" class="pagination-footer">
                    <?php
                    echo $pag_footer;
                    ?>
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="./main.js"></script>
</html>