<?php
class menuItems extends RecursiveIteratorIterator {
    function __construct($it) {
        parent::__construct($it, self::LEAVES_ONLY);
    }

        #[\ReturnTypeWillChange]
    function current() {
    }

        #[\ReturnTypeWillChange]
    function beginChildren() {
        echo '<option label="' . ucfirst(parent::current()) .  '" value="' . parent::current() . '">' . parent::current() . '</option>';
    }

        #[\ReturnTypeWillChange]
    function endChildren() {
        echo "\n";
    }
}

?>
