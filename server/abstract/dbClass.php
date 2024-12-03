<?php

class db_Class {
		var $db;
		var $insert_id;
		/*
			Connessione al database tramite i parametri indicati
		*/
	
		function __construct(){
			global $_PARAM;
			try{
				switch (dbType) {
					case "mysql":
						$dbhost = $_PARAM["mysql"]["host"];
						$dbusername = $_PARAM["mysql"]["user"];   
						$dbpassword = $_PARAM["mysql"]["password"];   
						$dbname = $_PARAM["mysql"]["database"];
						$this->db = new PDO("mysql:host=$dbhost;dbname=$dbname;charset=utf8mb4", $dbusername, $dbpassword);
					break;

					case "sqlite" :
						$this->db = new PDO("sqlite:".dataBaseName);
					break;

					default:
						returnError("Database type not correct: ->".dbType."<-");
					break;
				}
				
				$this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
				
			}catch(PDOException $e) {
				returnError($e->getMessage());
			}
			
		}

		function get_results ($query) {
			try{
				$result = array();
				foreach ($this->db->query($query, PDO::FETCH_ASSOC) as $item) {
                    // print_r($item);
					$result[] = (object) $item;
				}
				return $result;
			}catch(PDOException $e) {
				returnError($query . "<br>\n" . $e->getMessage());
			}
		}
	
		function query( $query ) {
			try{
				$this->db->query($query);
			}catch(PDOException $e) {
				returnError($query . "<br>\n" . $e->getMessage());
			}
			return true;
		}
		
        public function insertQuery ($query){
			
			try{
				$this->db->exec($query);
				$this->insert_id = $this->db->lastInsertId();
			}catch(PDOException $e) {
				returnError($query . "<br>\n" . $e->getMessage());
			}
			
            return true;
        }   

        public function get_row ($query){
			
			$items = $this->get_results ($query);
			
			if (count($items) > 0) {
				return $items[0];
			} else {
				return null;
			}
        }
}