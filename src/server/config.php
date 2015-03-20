<?php
/**
 * Created by IntelliJ IDEA.
 * User: alshubei
 * Date: 17.03.15
 * Time: 14:30
 */

//PDO
try {
    $handler = new PDO('mysql:host=127.0.0.1;dbname=alshubei','mokhtar','test1234');
    $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}