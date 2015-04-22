<?php
session_start();

if (isset($_GET['key'])) {
    if ($_GET['key'] == 'user') {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            print_r(json_encode($user));
        } elseif (isset($_SESSION['admin'])) {
            print_r(json_encode(array('userId'=>0, 'userName'=>$_SESSION['admin'], 'userEmail'=>$_SESSION['admin'])));
        } else

            print_r(json_encode(array('error'=>'wrong login data')));

    }
}

?>