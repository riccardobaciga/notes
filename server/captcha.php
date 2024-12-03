<?php
session_start();

// Generate a random 5-digit number
$captcha_number = rand(10000, 99999);
$_SESSION['captcha'] = $captcha_number;

// Create the image
$width = 150;
$height = 50;
$image = imagecreatetruecolor($width, $height);

// Colors
$background_color = imagecolorallocate($image, 255, 255, 255);
$text_color = imagecolorallocate($image, 0, 0, 0);

// Fill the background
imagefilledrectangle($image, 0, 0, $width, $height, $background_color);

// Add the text
imagettftext($image, 20, 0, 10, 30, $text_color, './captcha.ttf', $captcha_number);

// Output the image
header('Content-Type: image/png');
imagepng($image);
imagedestroy($image);
