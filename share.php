<?php
include_once "./server/pref.php";

$param = explode(';', base64_decode($_SERVER['QUERY_STRING']));
$empty = new stdClass();
$empty->titolo = "";
$empty->testo = "";

$test = ($param[0] != -1)?$myApp["textObj"]->getTextShared($param[0]):$empty ;
$modifica = ($param[1]==="true") ? '<button type="button" class="btn" id="editNote"><i class="bi bi-pencil me-2"></i>  Modifica</button>' : "";
header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html lang="it">

<head>
  <meta charset="utf-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="./resources/img/logo.png" sizes="32x32" />
  <title>Notes - Everywhere - SHARE</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    .invisible-input {
      background: transparent;
      color: inherit;
      /* Use the same color as the surrounding text */
      outline: none;
      /* Remove outline on focus */
      font-size: inherit;
      /* Match font size with surrounding text */
    }
    #textDiv {
            padding: 20px; /* Inner padding */
            margin: 20px; /* Margin around the page */
            height: 100%; /* Full height */
            box-sizing: border-box; /* Include padding and border in height */
        }
  </style>
</head>

<body>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
    crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.js"></script>
  <nav class="navbar navbar-expand-sm bg-body-tertiary fixed-top">
    <div class="container-fluid">
      <div class="navbar-brand">
        <input type="text" id="titoloEdit" class="form-control invisible-input" id="titleField"
          value="<?= mb_convert_encoding($test->titolo, 'UTF-8', 'ISO-8859-1') ?>" readOnly />
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <button type="button" class="btn" id="creaPdf"><i class="bi bi-file-pdf me-2"></i> Crea pdf</button>
        </div>
        <div class="navbar-nav">
          <?= $modifica ?>
        </div>
      </div>
    </div>
  </nav>
  <div class="m-4">&nbsp;</div>
  <div id="textDiv">
    <?= mb_convert_encoding(base64_decode(($test->testo)), 'UTF-8', 'ISO-8859-1')?>
  </div>
  <input type="hidden" id="idNota" value="<?= $param[0] ?>">
  <!-- message Modal -->
  <div class="modal fade" id="msgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" id="msgBar">
          <h1 class="modal-title fs-5" id="msgTitle"></h1>
        </div>
        <div class="modal-body" id="msgTxt"></div>
        <div class="modal-footer" id="msgBtn">
          <button type="button" class="btn btn-secondary" onclick="myApp.myModal.hide();">Close</button>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  <script src="./js/utils/globals.js"></script>
  <script src="./js/utils/localisation.js"></script>
  <script src="./js/utils/callServer.js"></script>
  <script type="module">
    import init from './share.js'
    init()
  </script>
</body>

</html>