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
        try {
            //do the db insertion
            $dispensers = $_POST['dispensers'];
            foreach ($dispensers as &$row) {

                //$row = $_POST['dispensers'][0];
                //ChromePhp::log('from PHP $row', $row);


                //filter out the not needed key-values, coming from the frontend json
                $matchedKeys = array_filter(array_keys($row),
                    function ($var) {
                        return in_array($var,
                            array("userId", "date", "pumpId", "prevCounter", "curCounter")) == true;
                    });
                $filteredRow = array_intersect_key($row, array_flip($matchedKeys));

                //build INSERT statement
                $user_id = $filteredRow['userId'];
                $date = "'" . $filteredRow['date'] . "'";
                $pumpId = $filteredRow['pumpId'];
                $prevCounter = $filteredRow['prevCounter'];
                $curCounter = $filteredRow['curCounter'];
                $values = implode(", ", array($user_id, $date, $pumpId, $prevCounter, $curCounter));
                $sql = "INSERT INTO `dispensers` (`user_id` ,`date`, `pumpId`, `prevCounter`, `curCounter`) VALUES ($values)";
                $result = $handler->prepare($sql);
                $result->execute();
            }
            print_r(json_encode(array('lastInsertId' => $handler->lastInsertId())));
            break;
        } catch (PDOException $e) {
            print_r(json_encode(array('error' => $e->getMessage())));
            die();
        }
    case "getjournals":
        $date = $_GET['date'];
        $query = "SELECT
                d.*
                FROM dispensers d
                WHERE d.date = " . $date;
        if (isset($_GET['userid'])) {
            $query = $query . " AND d.user_id = " . (int)$_GET['userid'];
        }
        ChromePhp::log('PHP getjournals', $query);

        $result = $handler->prepare($query);
        $result->execute();
        print_r(json_encode($result->fetchAll(PDO::FETCH_ASSOC)));
        break;
    case "getjournaldays":
        $dateFrom = $_GET['datefrom'];
        $dateTo = $_GET['dateto'];
        $query = "SELECT
                DISTINCT d.date
                FROM dispensers d
                WHERE d.date >= " . $dateFrom .
                "AND d.date <=" . $dateTo;
        if (isset($_GET['userid'])) {
            $query = $query . " AND d.user_id = " . (int)$_GET['userid'];
        }
        ChromePhp::log('from PHP sql getjournalday', $query);

        $result = $handler->prepare($query);
        $result->execute();
        print_r(json_encode($result->fetchAll(PDO::FETCH_ASSOC)));
        break;
    case "verifyuser":
        $query = "SELECT
                id,
                name,
                type
                FROM users
                WHERE
                name = '" . $_POST['userId'] . "'"
            . " AND BINARY
                password = '" . $_POST['pwd'] . "'";
        $result = $handler->prepare($query);
        $result->execute();
        if (sizeof($result->fetchAll(PDO::FETCH_ASSOC)) == '1') {
            print_r('1');
        } else {
            print_r('0');
        }
        break;
}

?>