<?php
// costanti
$myApp = [];

$tmpUrl =  (empty($_SERVER['HTTPS']) ? 'https' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$lastPosition = strrpos($tmpUrl, '/');
if ($lastPosition !== false) {
    $lastUrl = substr($tmpUrl, 0, $lastPosition);
} 


define("sl", "/");
define("prefixTable", "notes_");
define("baseDir", dirname(realpath(__FILE__)) . sl);
define("baseUrl",$lastUrl.sl);

// Define all constant 

$elements = scandir(baseDir);
foreach ($elements as $element) {
    if (!strstr($element, ".") && is_dir(baseDir . sl . $element) && ($element !== "bootStrap")) {
        define("path" . ucfirst($element), baseDir . $element . sl);
        define("url" . ucfirst($element), baseUrl . $element . sl);
        $subPath = baseDir . $element . sl;
        $subUrl = baseUrl . $element . sl;
        $subElements = scandir($subPath);
        foreach ($subElements as $subElement) {
            if (!strstr($subElement, ".") && is_dir($subPath . $subElement)) {
                define("path" . ucfirst($subElement), $subPath . $subElement . sl);
                define("url" . ucfirst($subElement), $subUrl . $subElement . sl);
            }
        }
        ;
    }
}
;

// COSTANTI PER IL DB
define("dbType","sqlite");
define("dataBaseName",pathData."notes.sqlite3");

includeDirFiles(pathAbstract);
includeDirFiles(pathClasses);
includeDirFiles(pathAction);

// $myApp["users"]->getUsers();
// print_r(get_defined_constants(true)['user']);

function includeDirFiles($dirName){
    global $myApp ;
    foreach(scandir($dirName) as $item) {
        if ($item !== "." && $item !== ".." && pathinfo($item, PATHINFO_EXTENSION) === "php"){
            // echo $dirName.$item."<br>";
            include_once($dirName.$item);
        }
    }
}


// FUNZIONI COMUNI

function dtFrm($dtIn)
{
    return substr($dtIn, 6, 2) . "/" . substr($dtIn, 4, 2) . "/" . substr($dtIn, 0, 4);
}

function dtFromCal($dtIn)
{
    return substr($dtIn, 0, 4) . substr($dtIn, 5, 2) . substr($dtIn, 8, 2);
}

function dtToCal($dtIn)
{
    return substr($dtIn, 0, 4) . "-" . substr($dtIn, 4, 2) . "-" . substr($dtIn, 6, 2); // 2021-05-01
}

function checkInput($quale, $default = "")
{
    global $$quale;
    $$quale = isset($_POST[$quale]) ? $_POST[$quale] : (isset($_GET[$quale]) ? $_GET[$quale] : $default);

    return $$quale;
}

function mandatory($nome)
{
    global $$nome;
    if (checkInput($nome) === "") {
        http_response_code(405);
        die("{\"result\":\"KO\",\"description\":\"campo -$nome- mancante " . listInput() . "\"}");
    } else {
        return $$nome;
    }
}

function returnError($msg)
{
    // print_r($msg);
    // die('{"result":"KO","description":"' . $msg . '"'+ listInput() +'"}');
    die('{"result":"KO","description":"' . $msg . '"}');
}

function returnData($msg)
{
    die('{"result":"OK","data":' . $msg . '}');
}

function listInput($what = "INPUT")
{
    $result = "";

    if ($what == "ALL" || $what == "GET" || $what == "INPUT") {
        foreach ($_GET as $k => $v) {
            $result .= "GET[$k] = >$v< "; // $k la "chiave", $v  il valore
        }
    }

    if ($what == "ALL" || $what == "POST" || $what == "INPUT") {
        foreach ($_POST as $k => $v) {
            $result .= "POST[$k] = >$v< "; // $k la chiave, $v  il valore
        }
    }

    if ($what == "ALL") {
        foreach ($GLOBALS as $k => $v) {
            if (gettype($v) != "object") {
                $result .= "GLOBAL[$k] = >$v< "; // $k la chiave, $v  il valore
            }
        }
        foreach ($_SERVER as $k => $v) {
            $result .= "SERVER[$k] = >$v< "; // $k la chiave, $v  il valore
        }

        // $result .= json_encode(get_defined_constants(true)['user']);
    }
    return $result;
}

function debug($msg)
{
    $nomeFileLog = pathLog . date("Ymd") . ".log";
    $filePtr = fopen($nomeFileLog, "a") or die("Unable to open file!");
    fwrite($filePtr, date("H:i:s") . ":" . $msg . "\n");
    fclose($filePtr);
}
