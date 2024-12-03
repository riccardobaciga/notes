<?php
include_once "../server/pref.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fileName = $_POST['file_name'];
    $label = $_POST['label'];
    $value = $_POST['value'];

    if (!file_exists($fileName)) {
        file_put_contents($fileName, json_encode([]));
    }

    $jsonData = json_decode(file_get_contents($fileName), true);

    if (array_key_exists($label, $jsonData)) {
        echo json_encode(['result' => 'ko', 'message' => 'La label esiste già.']);
        exit;
    }

    $jsonData[$label] = $value;

    if (file_put_contents($fileName, json_encode($jsonData, JSON_PRETTY_PRINT))) {
        echo json_encode(['result' => 'ok', 'message' => 'Il termine è salvato.']);
    } else {
        echo json_encode(['result' => 'ko', 'message' => 'Salvataggio fallito.']);
    }
} else {
    echo json_encode(['result' => 'ko', 'message' => 'Metodo di richiesta non valido.']);
}
?>