<?php
session_start(); //session starts here
?>

<?php

include("database/db_conection.php");

if (isset($_POST['login'])) {
    $user_email = $_POST['email'];
    $user_pass = $_POST['pass'];
    $salt = 'foobarbazBonn53119';
    $encrypted_pwd = sha1($salt . $user_pass);
    $check_user = "select id, name  from users WHERE email='$user_email' AND BINARY password='$encrypted_pwd'";
    $run = mysqli_query($dbcon, $check_user);
    $user_id = "";
    $user_name = "";
    while ($row = mysqli_fetch_array($run)) {
        $user_id = $row[0];
        $user_name = $row[1];
        $_SESSION['user'] = array('userId' => $user_id, 'userName' => $user_name, 'userEmail' => $user_email);
        break;
    }

    echo "<script>window.location.replace('../')</script>";
}
?>