<?php
session_start();//session starts here

?>

<html>
<head lang="en">
    <meta charset="UTF-8">
    <link type="text/css" rel="stylesheet" href="../styles/css/bootstrap.css">
    <title>Admin Login</title>
</head>
<style>
    .login-panel {
        margin-top: 150px;

</style>

<body>

<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="login-panel panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Sign In Admin</h3>
                </div>
                <div class="panel-body">
                    <form role="form" method="post" action="admin_login.php">
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" placeholder="Name" name="admin_name" type="text" autofocus>
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Password" name="admin_pass" type="password"
                                       value="">
                            </div>
                            <input class="btn btn-lg btn-default btn-block" type="submit" value="login"
                                   name="admin_login">
                        </fieldset>
                    </form>
                </div>
            </div>
            <a href='../' style="color: #ccc">back</a>
        </div>
    </div>
</div>


</body>

</html>

<?php
/**
 * Created by PhpStorm.
 * User: Ehtesham Mehmood
 * Date: 11/24/2014
 * Time: 3:26 AM
 */
include("database/db_conection.php");

if (isset($_POST['admin_login'])) //this will tell us what to do if some data has been post through form with button.
{
    $admin_name = $_POST['admin_name'];
    $admin_pass = $_POST['admin_pass'];

    $admin_query = "select * from admin where name='$admin_name' AND BINARY password= aes_encrypt('foobarbazBonn53119', '$admin_pass')";

    $run_query = mysqli_query($dbcon, $admin_query);

    if (mysqli_num_rows($run_query)) {

        echo "<script>window.location.replace('view_users.php')</script>";
        $_SESSION['admin']=$admin_name;
    } else {
        echo "<script>alert('Admin Details are incorrect..!')</script>";
    }

}

?>