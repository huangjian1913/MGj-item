<?php
header('Access-Control-Allow-Origin: *');
header("content-type:textml;charset=utf-8");
session_start();

// echo $_SESSION['regsession_code'];

if(isset($_POST['captcha'])){
    $code=$_POST["captcha"];
    // echo $code;
    if($code == $_SESSION['regsession_code']){
        echo true;
    }else{
        echo false;
    }
}