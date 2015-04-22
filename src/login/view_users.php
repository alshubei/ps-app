<?php
session_start();

if (!$_SESSION['admin']) {

    header("Location: admin_login.php");
}

?>

<html>
<head lang="en">
    <meta charset="UTF-8">
    <link type="text/css" rel="stylesheet" href="../styles/css/bootstrap.css">

    <title>View Users</title>
</head>
<style>
    .login-panel {
        margin-top: 150px;
    }

    .table {
        margin-top: 50px;

    }

</style>

<body>

<div class="container">
    <a href="../">Login (as Admin)</a> |
    <a href="registration.php">Register</a> |
    <a href="admin_logout.php">Logout</a>

    <div class="table-scrol">
        <h1 align="center">All the Users</h1>

        <div class="table-responsive"><!--this is used for responsive display in mobile and other devices-->


            <table class="table table-bordered table-hover table-striped" style="table-layout: fixed">
                <thead>

                <tr>

                    <th>User Id</th>
                    <th>User Name</th>
                    <th>User Pass</th>
                    <th>User E-mail</th>
                    <th>Delete User</th>
                </tr>
                </thead>

                <?php
                include("database/db_conection.php");
                $view_users_query = "select * from users"; //select query for viewing users.
                $run = mysqli_query($dbcon, $view_users_query); //here run the sql query.
                if (mysqli_num_rows($run)) {
                    $_SESSION['email'] = 'admin';
                }
                while ($row = mysqli_fetch_array($run)) //while look to fetch the result and store in a array $row.
                {
                    $user_id = $row[0];
                    $user_name = $row[1];
                    $user_pass = $row[2];
                    $user_email = $row[3];

                    ?>

                    <tr>
                        <!--here showing results in the table -->
                        <td><?php echo $user_id; ?></td>
                        <td><?php echo $user_name; ?></td>
                        <td><input readonly type="password" value="<?php echo $user_pass; ?>"></td>
                        <td><?php echo $user_email; ?></td>
                        <td><a href="delete.php?del=<?php echo $user_id ?>">
                                <button disabled class="btn btn-danger">Delete</button>
                            </a></td>
                        <!--btn btn-danger is a bootstrap button to show danger-->
                    </tr>

                <?php } ?>

            </table>
        </div>
    </div>
    <a href="../">.</a>
</div>

</body>

</html>
