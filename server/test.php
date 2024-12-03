<?php
include_once ("./pref.php");

$result = new stdClass();
$result->menu = $myApp["menuObj"]->getMenu ("1");

return json_encode($result);
 
/*
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['data'])) {
    // Get the compressed data
    $compressedData = $data['data'];
    echo 'compressedData ->'. $compressedData .'<- <br>\n ';
    // Decompress the data
    $decompressedData = lz_decompress($compressedData);
    echo 'decompressedData ->'. $decompressedData .'<- <br>\n ';

    // Do something with the decompressed data (e.g., save to database)
    // For demonstration, we will just return the decompressed data
    echo json_encode(['decompressedData' => $decompressedData]);
} else {
    echo json_encode(['error' => 'No data received']);
}

// Function to decompress LZ-String compressed data
function lz_decompress($compressed) {
    return LZString::decompressFromBase64($compressed);
}
    */