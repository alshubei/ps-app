<?php
/**
 * Created by IntelliJ IDEA.
 * User: alshubei
 * Date: 02.04.15
 * Time: 16:26
 */

//PDO
try {
    $handler = new PDO('mysql:host=127.0.0.1;dbname=db12279398-alshubei','db12279398-mokh','Hamzah53119?');
    $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}