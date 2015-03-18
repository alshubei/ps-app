<?php
/**
 * Created by IntelliJ IDEA.
 * User: alshubei
 * Date: 17.03.15
 * Time: 14:30
 */

/*
 *

$username = "mokhtar";
$password = "test1234";
$hostname = "localhost";
$databasename = 'alshubei';

//connect to database
$mysqli = new mysqli($hostname, $username, $password, $databasename);

if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
*/

//PDO
try {
    $handler = new PDO('mysql:host=127.0.0.1;dbname=alshubei','mokhtar','test1234');
    $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}