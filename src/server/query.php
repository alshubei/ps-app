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
        break;
    case "savejournals":
        $query = "";
        break;
}

$result = $handler->prepare($query);
$result->execute();

//echo json_encode($result->fetchAll());
print_r(json_encode($result->fetchAll()));

?>