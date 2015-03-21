<?php
/**
 * Created by IntelliJ IDEA.
 * User: alshubei
 * Date: 17.03.15
 * Time: 14:35
 */
include_once("config.php");


include 'ChromePhp.php';
//ChromePhp::log($_SERVER);

$query = "";
$urlQrStr = $_GET["data"];
switch ($urlQrStr) {
    case "pumps":
        $query = "SELECT
                p.id pid,
                p.name pname,
                f.id fid,
                f.name fname,
                f.price fprice
                FROM pumps p
                JOIN fuels f
                ON p.fuel_id = f.id";
        $result = $handler->prepare($query);
        $result->execute();

        print_r(json_encode($result->fetchAll(PDO::FETCH_ASSOC)));
        break;
    case "savejournals":
        ChromePhp::log('from PHP', $_POST['dispensers']);

        //build INSERT statement

        //print_r(json_encode($_POST['dispensers']));
        //return the count or other more info as a POST response
        print_r(2);
        break;
}
//INSERT INTO dispensers (date,pump_id,prevCounter,curCounter) VALUES (" . '2015-03-20' . ",0,)


?>