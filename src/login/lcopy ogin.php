<?php
session_start(); //session starts here

?>
    <html>
    <head lang="en">
        <meta charset="UTF-8">
        <link type="text/css" rel="stylesheet" href="bootstrap-3.2.0-dist/css/bootstrap.css">
        <title>Login</title>
    </head>
    <style>
        .login-panel {
            margin-top: 150px;

    </style>

    <body>

    <script type="text/javascript" src="../assets/main.js"></script>
    </body>

    </html>

<?php

include("database/db_conection.php");

if (isset($_POST['login'])) {
    $user_email = $_POST['email'];
    $user_pass = $_POST['pass'];

    $check_user = "select * from users WHERE email='$user_email' AND BINARY password='$user_pass'";

    $run = mysqli_query($dbcon, $check_user);

    if (mysqli_num_rows($run)) {
        echo "<script>window.open('../','_self')</script>";

        $_SESSION['email'] = $user_email;

    } else {
        echo "<script>alert('Email or password is incorrect!')</script>";
    }
}
?>