<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // values for connecting to the database
    $db_host = 'mysql.cs.nott.ac.uk';
    $db_name = 'psyjg18_COMP1004';
    $db_user = 'psyjg18_COMP1004';
    $db_password = 'JAMES17';
    $tableValue = $_POST["searchTable"];
    $msg = "<script type='text/javascript'> var x = window.parent.document.getElementById('target_iframe'); x.classList.remove('results_class_hide'); x.classList.add('results_class_show'); </script>";

    // connects to the mysql.cs.nott.ac.uk server
    $con = new mysqli($db_host,$db_user,$db_password,$db_name);

    echo("<html> <style> .tableClass {text-align: center; width : 50%; border: 1px; cellpadding : 1; cellspacing : 1; font-family: verdana } body{ color : white; } </style> ");

    // testing connection error
    if($con->connect_errno)
    {
        die("Connection failed : " . $con->connect_errno . $con->connect_error. "\n </body> </html>");
    }

    // if hidden input value indicates Actor fields
    if($_POST['searchActorInputHidden'] == 1){

        $searchActorName = $_POST["searchActFullName"];
        $searchActorAge = $_POST["searchActAge"];
        $sql = "SELECT";

        // If all values are empty then search the entire database
        if( empty($searchActorName) && empty($searchActorAge) ){
            $sql = $sql . " * FROM Actor;";
            $result = $con->query($sql);
            if ($result->num_rows > 0) {
                echo ("".$msg." <body> <table class = 'tableClass'> <tr> <th>ID</th> <th>Name</th> <th>Age</th> </tr>");
                while($row = $result->fetch_assoc()) {
                    echo("<tr> <td>". $row["actID"]."</td> <td>".$row["actName"]."</td> <td>".$row["Age"]."</td></tr>");
                }
                echo("</table> </body> </html>");
            } else {
                echo("0 results </body> ".$msg." </html>");
            }

            exit();
        }

        // tests each combination of input fields as there are only 2 - the result is the associate SQL statement
        if( isset($searchActorName) && empty($searchActorAge)) {
            $sql = $sql . " * FROM Actor WHERE actName = '" .$searchActorName. "';";

        } else if (isset($searchActorAge) && empty($searchActorName)){
            $sql = $sql . " * FROM Actor WHERE Age = '" .$searchActorAge. "';";

        } else if (isset($searchActorAge) && isset($searchActorName)){
            $sql = $sql . " * FROM Actor WHERE actName = '" .$searchActorName. "' AND Age = '" .$searchActorAge. "';";
        }

        // Queiries sql and decisive num_rows variable prints the table of values or lack of. 
        $result = $con->query($sql);
        if ($result->num_rows > 0) {
            echo (" <body> <table class = 'tableClass'> <tr><th>ID</th><th>Name</th><th>Age</th> </tr>");
            while($row = $result->fetch_assoc()) {
                echo("<tr>");
                echo"<td>" . $row['actID'] . "</td>";
                echo"<td>" . $row['actName'] . "</td>";
                echo"<td>" . $row['Age'] . "</td>";
                echo"</tr>";
            }
            echo("</table> </body> ".$msg."</html>");
            exit();

        } else {
            echo("0 results </body> ".$msg." </html>");
            exit();
        }
    
    // indicates shown values in page are for Movie fields
    } else if($_POST["searchMovieInputHidden"] == 1){
        $searchMvActorName = $_POST["searchMvActorName"];
        $searchMvName = $_POST["searchMvName"];
        $searchMvRating = $_POST["searchMvRating"];
        $searchMvGenre = $_POST["searchMvGenre"];
        $searchMvLength = $_POST["searchMvLength"];
        $before = 0;
        
        // If all values are empty then search the entire database
        if(empty($searchMvActorName) && empty($searchMvName) && empty($searchMvRating) && empty($searchMvGenre) && empty($searchMvLength)){
            $sql = "SELECT * FROM Movie;";
            $result = $con->query($sql);
            if ($result->num_rows > 0) {
                echo(" <body> <table class = 'tableClass'> <tr><th>ActorID</th> <th>Title</th> <th>Rating</th> <th>Genre</th> <th>Length</th></tr>");
                while($row = $result->fetch_assoc()) 
                {
                    echo("<tr>");
                    echo"<td>" . $row['actID'] . "</td>";
                    echo"<td>" . $row['mvName'] . "</td>";
                    echo"<td>" . $row['mvRating'] . "</td>";
                    echo"<td>" . $row['Genre'] . "</td>";
                    echo"<td>" . $row['mvLength'] . "</td>";
                    echo"</tr>";
                }
                echo(" </table> </body> ".$msg."</html>");
            } else {
                echo(" <body> 0 results for the associated movie. </body>".$msg." </html> ");
            }

            exit();
        }


        // Gets the associated actorID
        $nameToActorId = "SELECT actID FROM Actor WHERE actName = '".$searchMvActorName."';";
        $idResult_Name = $con->query($nameToActorId); 
        $rowActorId = $idResult_Name->fetch_assoc();

        $sql = " SELECT * FROM Movie WHERE ";
        // creating sql statement
        if(!empty($searchMvActorName)){
            $sql = $sql . " actID = '".$rowActorId['actID']."'";
            $before  += 1;
        }

        if(!empty($searchMvName)){
            if($before > 0){
                $sql = $sql . " AND "; 
            }
            $before  += 1;
            $sql = $sql . "mvName = '".$searchMvName."'";
        }

        if(!empty($searchMvRating)){
            if($before > 0){
                $sql = $sql . " AND "; 
            }
            $sql = $sql . "mvRating = '".$searchMvRating."'";
            $before += 1;
        } 

        if(!empty($searchMvGenre)){
            if($before > 0){
                $sql = $sql . " AND "; 
            }
            $sql = $sql . "Genre = '".$searchMvGenre."'";
            $before  += 1;
        }

        if(!empty($searchMvLength)){
            if($before > 0){
                $sql = $sql . " AND "; 
            }
            $sql = $sql . "mvLength = '".$searchMvLength."'";
            $before  += 1;
        } 

        $sql = $sql . ";";
        // Queiries sql and decisive num_rows variable prints the table of values or lack of. 
        $result = $con->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            echo("".$msg." <body> <table class = 'tableClass'> <tr> <th>ActorID</th> <th>Title</th> <th>Rating</th> <th>Genre</th> <th>Length</th> </tr>");
            while($row = $result->fetch_assoc()) 
            {
                echo("<tr>");
                echo"<td>" . $row['actID'] . "</td>";
                echo"<td>" . $row['mvName'] . "</td>";
                echo"<td>" . $row['mvRating'] . "</td>";
                echo"<td>" . $row['Genre'] . "</td>";
                echo"<td>" . $row['mvLength'] . "</td>";
                echo"</tr>";
            }
            echo(" </table> </body> </html>");
        } else {
            echo(" <body> 0 results for the associated movie. </body>".$msg." </html> ");
        }

        exit();
    }

    $con -> close();
?>