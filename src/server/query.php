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
                p.id pumpId,
                p.name pName,
                f.id fId,
                f.name fName,
                f.price fPrice
                FROM pumps p
                JOIN fuels f
                ON p.fuel_id = f.id";
        $result = $handler->prepare($query);
        $result->execute();

        print_r(json_encode($result->fetchAll(PDO::FETCH_ASSOC)));
        break;
    case "savejournals":
        //optimistic response to feedback that insertion is done!
        $count = 1;
        //do the db insertion
        $dispensers = $_POST['dispensers'];
        foreach ($dispensers as &$row) {

            //$row = $_POST['dispensers'][0];
            ChromePhp::log('from PHP', $row);

            //filter out the not needed key-values, coming from the frontend json
            $matchedKeys = array_filter(array_keys($row),
                function ($var) {
                    return in_array($var,
                        array("date", "pumpId", "prevCounter", "curCounter")) == true;
                });
            $filteredRow = array_intersect_key($row, array_flip($matchedKeys));
            ChromePhp::log('from PHP after filter', $filteredRow);

            //build INSERT statement
            $date = "'" . $filteredRow['date'] . "'";
            $pumpId = $filteredRow['pumpId'];
            $prevCounter = $filteredRow['prevCounter'];
            $curCounter = $filteredRow['curCounter'];
            $values = implode(", ", array($date, $pumpId, $prevCounter, $curCounter));
            ChromePhp::log('from PHP values', $values);
            $sql = "INSERT INTO `dispensers` (`date`, `pumpId`, `prevCounter`, `curCounter`) VALUES ($values)";
            ChromePhp::log('from PHP sql is', $sql);
            //filter the front end related keys out

            //$escaped_values = array_map('mysql_real_escape_string', array_values($filteredRow));
            //ChromePhp::log('from PHP escaped values', $escaped_values);
            //$values = implode(", ", $escaped_values);

            //print_r(json_encode($_POST['dispensers']));
            //return the count or other more info as a POST response
            $result = $handler->prepare($sql);
            $result->execute();

        }
        print_r($count);
        break;
    case "getjournals":
        $date = $_GET['date'];
        $query = "SELECT
                *
                FROM dispensers";

                //WHERE date = " . $date;
        $result = $handler->prepare($query);
        $result->execute();
        ChromePhp::log('from PHP fetch dispensers params', $_GET['date']);
        print_r(json_encode($result->fetchAll(PDO::FETCH_ASSOC)));
        break;
}
//INSERT INTO dispensers (date,pump_id,prevCounter,curCounter) VALUES (" . '2015-03-20' . ",0,)


?>