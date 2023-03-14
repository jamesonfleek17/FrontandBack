// specifies in a target <p> what table has been clicked        // can be merged together
function clickedMeTable(tableClicked)
{
    let text1 = "Table: "
    var div = document.getElementById('specTable').innerHTML = text1.concat(tableClicked);
}
function clickedMeOperation(operationClicked)
{
    text1 = "Operation: "
    var div = document.getElementById('addOrDeleteP').innerHTML = text1.concat(operationClicked);
}


// functions for hiding divs based on users choice
function hideMovie(){
    var divHide = document.getElementById('movieInput');
    var divShow = document.getElementById('actorInput');

    divHide.style.display = 'none';
    divShow.style.display = 'block';
}
function hideActor(){
    var divHide = document.getElementById('actorInput');
    var divShow = document.getElementById('movieInput');

    divHide.style.display = 'none';
    divShow.style.display = 'block';
}


// function for validating user input texts in form
function validateText()
{
    var x = document.getElementById("actorInput");
    if( window.getComputedStyle(x).display === "none" )
    {
        // table chosen is movie 
        var divElementMovie = document.getElementById("movieInput");
        var textBoxesMovie = divElement.querySelectorAll("input[type = text]");
        var flagMv = 0;
        msgMv = "These fields are void:";

        for (var i = 0; i < divElementMovie.length; i++)
        {
            if(textBoxesMovie[i].value.trim() == "")
            {
                flagMv = 1;
                msgMv += textBoxesMovie[i] + ", ";
            }
        }

        if(flagMv == 1){
            alert(msgMv);
            return false;
        }

        return true;

    } else {

        // table chosen is actor 
        var divElementActor = document.getElementById("actorInput");
        var textBoxesActor = document.querySelectorAll("input[type=text]");
        var flagAct = 0;
        msgAct = "These fields are void:";


        for ( var j = 0; j < textBoxesActor.length ; j++)
        {
            if( textBoxesActor[j].value.trim() == "")
            {
                flagAct = 1;
                msg += textBoxesActor[j] + ", ";
            }
        }

        if(flagAct = 1)
        {
            alert(msgAct);
            return false;
        }

        return true;
    }
}


// validation checks on user inputs
function validateRadio()
{
    // validating radio buttons with arrays of inputs
    var radio1Buttons = document.tableToChangeForm.tableToChange;     // Table to Change 
    var radio2Buttons = document.tableToChangeForm.operationValue;       // operation to perform
    var flag1 = 0;
    var flag2 = 0;
    alertText = "";

    for( var i = 0; i < radio1Buttons.length ; i++)
    {
        if(radio1Buttons[i].checked){
            flag1 = 1;
            break;
        }
    }

    for( var j = 0; j < radio2Buttons.length ; j++)
    {
        if(radio2Buttons[j].checked){
            flag2 = 1;
            break;
        }
    }

    // outputs for radio buttons
    if(flag1 == 0 && flag2 == 0)
    {
        alertText = alertText + "Please enter table and operation\n";

    } else if(flag1== 0){
        alertText = alertText + "Please enter Table for operation: " + radio2Buttons[j].value + "\n";

    } else if(flag2 == 0){
        alertText = alertText + "Please enter operation on table: " + radio1Buttons[i].value + "\n";

    }

    if(flag1 == 0 || flag2 == 0){
        alert("" + alertText);
        return false;
    }
        

    return true;

}




