<?php
     include_once ("./pref.php");

     sleep(1);


     // $compressedData = base64_decode(file_get_contents('php://input'), true);
     // $_parameter = json_decode(gzinflate($compressedData), true);
 
     $_parameter = json_decode(base64_decode(file_get_contents('php://input'), true));
     // print_r($_parameter);
     // print_r($myApp);
     $obj = $_parameter->object;
     $action = $_parameter->action;
     $param = $_parameter->param;
     returnData($myApp[$obj]->$action($param));
     
