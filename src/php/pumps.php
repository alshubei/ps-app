<?php
/**
 * Created by IntelliJ IDEA.
 * User: alshubei
 * Date: 17.03.15
 * Time: 14:35
 */

include_once("config.php");

//$query = "SELECT p.id, f.name FROM pumps p JOIN fuels f ON p.fuel_id = f.id";

//$myArray = array();
//if ($result = $mysqli->query($query)) {
//    $tempArray = array();
//    /* fetch associative array */
//    while ($row = $result->fetch_object()) {
//        //printf("%s (%s)\n", $row["p.id"], $row["f.name"]);
//        $tempArray = $row;
//        array_push($myArray, $tempArray);
//    }
//    //print_r(json_encode($myArray));
//    echo json_encode($myArray);
//}
//
//
///* free result set */
//$result->free();
//
///* close connection */
//$mysqli->close();

$result = $handler->prepare("SELECT
p.id pid,
p.name pname,
f.id fid,
f.name fname,
f.price fprice
FROM pumps p
JOIN fuels f
ON p.fuel_id = f.id");
$result->execute();

echo json_encode($result->fetchAll());
//print_r(json_encode($result->fetchAll()));

?>