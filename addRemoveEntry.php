<?php

//values from html


// values for connecting to the database
$db_host = 'mysql_cs.nott.ac.uk';
$db_name = 'psyjg18';
$db_user = 'psyjg18';
$db_password = 'JAMES17'

$con = new mysqli($db_host,$db_name,$db_user,$db_password);
if($con->connect_errno) die("Failed to connect to the database")




?>