<?php
class menuItems extends RecursiveIteratorIterator { 
    function __construct($it) { 
        parent::__construct($it, self::LEAVES_ONLY); 
    }

    function current() {
    }

    function beginChildren() { 
        echo '<option value="' . parent::current() . '">' . parent::current() . '</option>'; 
    } 

    function endChildren() { 
        echo "\n";
    } 
} 

?>
