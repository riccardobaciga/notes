<?php
class actionClass {
		var $param ;

		function __construct(){

		}

		function decodeParam ($base64String){
			$this->param = json_decode(base64_decode($base64String));
		}
}