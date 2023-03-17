<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // values for connecting to the database
    $db_host = 'mysql.cs.nott.ac.uk';
    $db_name = 'psyjg18_COMP1004';
    $db_user = 'psyjg18_COMP1004';
    $db_password = 'JAMES17'


    // connects to the avon.cs.nott.ac.uk server
    $con = new mysqli($db_host,$db_user,$db_name,$db_password);


    if(!$con->connect_errno)
    {
        die("1. Connection failed : " . mysqli_connect_error());
    }

    echo("connected successfully");



    //values passed by tableToChangeForm
    $tableVal = $_POST["tableToChange"];
    $operationOnTable = $_POST["operationValue"];

    if($_POST['actorInputHidden'] == 1)
    {
        // Actor input fields are shown + sent
        $actorName = $_POST["actFullName"];
        $actorAge = $_POST["actAge"];

        // preparing statement
        $sql ="".$operationOnTable."".$tableVal."(actName, Age) VALUES ('".$actorName."','".$actorAge"');";


    } else if($_POST['movieInputHidden'] == 1){
        
        // Movie input fields are shown + sent
        $mvActorId = $_POST["mvActorId"];
        $mvName = $_POST["mvName"];
        $mvRating = $_POST["mvRating"];
        $mvGenre = $_POST["mvGenre"];
        $mvLength = $_POST["mvLength"];


        //preparing statement
        $sql = "".$operationOnTable."".$tableVal."(actID,mvName,mvRating,Genre,Length) VALUES ('".$mvActorId."','".$mvName."','".$mvRating."','".$mvGenre."','".$mvLength."');";
    }

    // preparing the statement
    $stmt = $con->prepare($sql);
    $stmt->execute();


    echo ("New records created successfully");

    $stmt->close();
    $con->close();


     print_r($data)

?>