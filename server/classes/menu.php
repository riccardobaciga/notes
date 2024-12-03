<?php

class menuObj extends db_Class {

    public function getMenu ($level){
        $result = [];
        $tmp = $this->get_results ("
        SELECT * 
            FROM `".prefixTable."menu` 
        WHERE
            level <= $level
        ORDER BY progressivo");
        foreach($tmp  as $item){
            if ($item->submenu !== ""){
                $item->sub = $this->get_results ("
                SELECT * 
                    FROM `".prefixTable."menu` 
                WHERE
                    nomeMenu = '".$item->submenu."'
                    AND level <= $level
                ORDER BY progressivo");
            }
            if (!isset($result[$item->nomeMenu])) {
                $result[$item->nomeMenu] = [];
            }
            array_push($result[$item->nomeMenu],$item);
        }
        
        return $result;
    }
}

$myApp["menuObj"] = new menuObj();