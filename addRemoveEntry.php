<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); 

    // values for connecting to the database
    $db_host = 'mysql.cs.nott.ac.uk';
    $db_name = 'psyjg18_COMP1004';
    $db_user = 'psyjg18_COMP1004';
    $db_password = 'JAMES17';

    $msg = (" <script type='text/javascript'>   var y = window.parent.document.getElementById('target_operation');  y.classList.remove('results_class_hide');   y.classList.add('results_class_show'); </script>  </html>");


    // connects to the mysql.cs.nott.ac.uk server
    $con = new mysqli($db_host,$db_user,$db_password,$db_name);
    echo("
        <html>
    
        <style>
            body {
                color: white;
            }
        </style>
    
        <body>
    ");

    if($con->connect_errno)
    {
        die("Connection failed : " . $con->connect_errno . $con->connect_error. "<br> </body> </html>");
    }

    //values passed by tableToChangeForm
    $tableVal = $_POST["tableToChange"];
    $operationOnTable = $_POST["operationValue"];

    if($_POST['actorInputHidden'] == 1)
    {
        // Actor input fields are shown + sent
        $actorName = $_POST["actFullName"]; //REQUIRED
        $actorAge = $_POST["actAge"];

        // all required attributes are first
        if(empty($actorName))
        {
            echo("Required field: ".$actorName."is empty </body>" . $msg);
            exit();
        } 

        // preparing statement
        if($operationOnTable == "INSERT INTO "){
            
            // checking if username already exists to add
            $namecheckquery = "SELECT actName FROM ".$tableVal." WHERE actName= '" . $actorName ."';";
            $result = $con->query($namecheckquery);
            if ($result->num_rows > 0)
            {
                // echos username already exists and quits
                echo ("Name: ".$actorName." already exists </body>" . $msg); 
                exit();
            }

            if(empty($actorAge)){
                // not a required field
                $sql ="INSERT INTO Actor (actName) VALUES ('".$actorName."');";
            } else {
                //name doesnt already exist and values can be added
                $sql ="INSERT INTO Actor (actName, Age) VALUES ('".$actorName."','".$actorAge."');";
            }


        } else if($operationOnTable == "DELETE FROM "){

            // checks wether actor has associated movies
            $nameToActorId = "SELECT actID FROM Actor WHERE actName = '".$actorName."';";
            $nameRows = $con->query($nameToActorId);
            $row = $nameRows->fetch_assoc();
            $check_movie = "SELECT * FROM Movie WHERE actID = '".$row['actID']."';";
            $check_movie_query = $con->query($check_movie);
            if( $check_movie_query->num_rows > 0){
                echo("Unable to delete actor, has associated movies: <br>");
                    while ( $movieNameRows = $check_movie_query->fetch_assoc() ){
                        echo("- '".$movieNameRows['mvName']."'<br>");
                    }
                echo("</body> ". $msg);
                exit();
            }

            // query to check if the actor to remove exists
            if(empty($actorAge))
            {
                $namecheckqueryAge = "SELECT * FROM ".$tableVal.";";

            } else {
                $namecheckqueryAge = "SELECT actName FROM ".$tableVal." WHERE actName= '" . $actorName ."' AND Age = '".$actorAge."';";
            }


            $result = $con->query($namecheckqueryAge);
            if ($result->num_rows < 1)
            {
                if(empty($actorAge)){
                    echo ("Name: ".$actorName." does not exist </body> " . $msg); 
                } else {
                    echo ("Name: ".$actorName." Age: ".$actorAge." does not exist </body> " . $msg); 
                }
                exit();
            }

            if(empty($actorAge)){
                // not a required field
                $sql = "DELETE FROM Actor WHERE actName = '".$actorName."';";
            } else {
                //name doesnt already exist and values can be added
                $sql = "DELETE FROM Actor WHERE actName = '".$actorName."' AND Age = '".$actorAge."';";
            }
        }


    // Movie fields sent
    } else if($_POST['movieInputHidden'] == 1){
        
        // Movie input values
        $mvActorName = $_POST["mvActorName"]; //REQUIRED
        $mvName = $_POST["mvName"]; //REQUIRED
        $mvRating = $_POST["mvRating"];
        $mvGenre = $_POST["mvGenre"];
        $mvLength = $_POST["mvLength"];

        if (empty($mvActorName) || empty($mvName)){
            echo("Required field Actor name: ".$mvActorName."is empty <br> Required field Movie name: ".$mvName."</body>" . $msg);
            exit();
        }
        // both required elements are filled in

        if($operationOnTable == "INSERT INTO "){
            
            // Searching for associated ActorID for ActorName
            $nameToActorId = "SELECT actID FROM Actor WHERE actName = '".$mvActorName."';";
            $nameRows = $con->query($nameToActorId);
            $row = $nameRows->fetch_assoc();
            if($nameRows->num_rows != 1){
                echo(" No user with that username exists inside of the database / too many users. </body> " . $msg);
                exit();
            }

            $sql = "INSERT INTO Movie (actID,mvName";
    
            // creating sql statement
            if(!empty($mvRating)){
                $sql = $sql . ", mvRating";
            } 
            if(!empty($mvGenre)){
                $sql = $sql . ", Genre";
            }
            if(!empty($mvLength)){
                $sql = $sql . ", mvLength";
            }
    
            $sql = $sql . ") VALUES ('".$row['actID']."','".$mvName."'";
    
            if(!empty($mvRating)){
                $sql = $sql . ",'".$mvRating."'";
            } 
            if(!empty($mvGenre)){
                $sql = $sql . ",'".$mvGenre."'";
            }
            if(!empty($mvLength)){
                $sql = $sql . ",'".$mvLength."'";
            }
            $sql = $sql . ");";


        } else if($operationOnTable == "DELETE FROM "){
    
            // searhcing for the actorID
            $nameToActorId = "SELECT actID FROM Actor WHERE actName = '".$mvActorName."';";
            $idResult_Name = $con->query($nameToActorId); 
            $rowActorId = $idResult_Name->fetch_assoc();
            if($idResult_Name->num_rows != 1){
                echo("Incrorrect number of users returned. Unable to process actor Name. </body> " . $msg);
                exit();
            }

            $sql = "DELETE FROM Movie WHERE actID = '".$rowActorId['actID']."' AND mvName = '".$mvName."'";

            if(strlen($mvRating) != 0){
                $sql = $sql. " AND mvRating = '".$mvRating."'";
            } 
            if(strlen($mvGenre) != 0){
                $sql = $sql . " AND Genre = '".$mvGenre."'";
            }
            if(strlen($mvLength) != 0){
                $sql = $sql . " AND mvLength = '".$mvLength."'";
            }
    
            $sql = $sql . ";";

        }
    }
    // preparing the statement
    $stmt = $con->prepare($sql);
    $stmt->execute();


    // preparing statement
    if($operationOnTable == "INSERT INTO "){
        echo ("Records with these parameters were created successfully.<br>");
    } else if($operationOnTable == "DELETE FROM "){
        echo ("Records with these attributes deleted successfully.<br>");
    }

    echo("</body>" . $msg);

    $con -> close();

?>