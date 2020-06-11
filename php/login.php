<?php
include "conn.php";
header('Access-Control-Allow-Origin: *');
header("content-type:textml;charset=utf-8");
session_start();

if (isset($_POST['user']) && isset($_POST['pass']) && isset($_POST['captcha'])) {
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $code=$_POST["captcha"];
    $result = $conn->query("select * from mogujie_registry where username='$user' and password='$pass'");
    if ($result->fetch_assoc() && $code == $_SESSION['regsession_code']) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}