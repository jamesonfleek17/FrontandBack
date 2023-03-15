// used for target <p> tags to identify to the user what Radio buttons have been clicked
// applies to Table names, operation names
function clickedMeRadio(tableClicked,pToChange)
{
    let text1 = "Table: ";
    let text2 = "Operation: ";
    let text3 = "Table searching: ";

    switch(pToChange)
    {
        case "specTable":
            var div = document.getElementById(pToChange).innerHTML = text1.concat(tableClicked); 
            break;
        case "addOrDeleteP":
            var div = document.getElementById(pToChange).innerHTML = text2.concat(tableClicked);
            break;
        case "searchTable":
            var div = document.getElementById(pToChange).innerHTML = text3.concat(tableClicked);
            break;
    }

}


// Each Table has a series of textBoxes to enter in a specified div
// called by radio buttons to hide/show associated div inputs with radio boxes
function hideDiv(eleToHide,eleToShow){
    var divHide = document.getElementById(eleToHide);
    var divShow = document.getElementById(eleToShow);

    divHide.style.display = 'none';
    divShow.style.display = 'block';
}

/*
function searchValidateText()
{
    var x = document.getElementById("searchActorInput");
    msg = "";

    if( window.getComputedStyle(x).display === "none" )
    {
        // table chosen is movie 
        var divElementMovie = document.getElementById('searchMovieInput');
        var textBoxesMovie = divElementMovie.querySelectorAll('input[type="text"]');
        msg = "Empty Elements are: \n";
        var mvFlag = 0;

        for(var i = 0 ; i < textBoxesMovie.length; i++){
            if( textBoxesMovie[i].value.trim() == "" )
            {
                msg += "- " + textBoxesMovie[i].placeholder + "\n";
                mvFlag = 1;
            }
        }

        if( mvFlag == 1)
        {
            alert(msg);
            return false;
        }

        return true;

    } else {
        // table chosen is actor 
        var divElementActor = document.getElementById('searchActorInput');
        var textBoxesActor = divElementActor.querySelectorAll('input[type="text"]');
        actMsg = "Empty elements are: \n";
        var actFlag = 0;

        for(var j = 0 ; j < textBoxesActor.length; j++){
            if( textBoxesActor[j].value.trim() == "" )
            {
                actMsg += "- " + textBoxesActor[j].placeholder + "\n";
                actFlag = 1;
            }
        }

        if( actFlag == 1)
        {
            alert(actMsg);
            return false;
        }

        return true;
    }
}
*/
// client side radio box validation
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


function searchValidateRadio()
{
    // validating radio buttons with arrays of inputs
    var radio1Buttons = document.tableToBeSearched.searchTable;     // Table to Change 
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


    // outputs for radio buttons
    if( flag1 == 0 )
    {
        alertText = alertText + "Please enter table to search\n";
    }


    if( flag1 == 0 ){
        alert("" + alertText);
        return false;
    }
        
    return true;
}

function validateTextUniversal(textDiv,otherDiv)
{
    var x = document.getElementById(textDiv);
    msg = "";

    if( window.getComputedStyle(x).display === "none" )
    {
        // table chosen is movie 
        var divElementMovie = document.getElementById(otherDiv);
        var textBoxesMovie = divElementMovie.querySelectorAll('input[type="text"]');
        msg = "Empty Elements are: \n";
        var mvFlag = 0;

        for(var i = 0 ; i < textBoxesMovie.length; i++){
            if( textBoxesMovie[i].value.trim() == "" )
            {
                msg += "- " + textBoxesMovie[i].placeholder + "\n";
                mvFlag = 1;
            }
        }

        if( mvFlag == 1)
        {
            alert(msg);
            return false;
        }

        return true;

    } else {
        // table chosen is actor 
        var divElementActor = document.getElementById(textDiv);
        var textBoxesActor = divElementActor.querySelectorAll('input[type="text"]');
        actMsg = "Empty elements are: \n";
        var actFlag = 0;

        for(var j = 0 ; j < textBoxesActor.length; j++){
            if( textBoxesActor[j].value.trim() == "" )
            {
                actMsg += "- " + textBoxesActor[j].placeholder + "\n";
                actFlag = 1;
            }
        }

        if( actFlag == 1)
        {
            alert(actMsg);
            return false;
        }

        return true;
 
    }

}


// client side text box validation
/*
function validateText()
{
    var x = document.getElementById("actorInput");
    msg = "";

    if( window.getComputedStyle(x).display === "none" )
    {
        // table chosen is movie 
        var divElementMovie = document.getElementById('movieInput');
        var textBoxesMovie = divElementMovie.querySelectorAll('input[type="text"]');
        msg = "Empty Elements are: \n";
        var mvFlag = 0;

        for(var i = 0 ; i < textBoxesMovie.length; i++){
            if( textBoxesMovie[i].value.trim() == "" )
            {
                msg += "- " + textBoxesMovie[i].placeholder + "\n";
                mvFlag = 1;
            }
        }

        if( mvFlag == 1)
        {
            alert(msg);
            return false;
        }

        return true;

    } else {
        // table chosen is actor 
        var divElementActor = document.getElementById('actorInput');
        var textBoxesActor = divElementActor.querySelectorAll('input[type="text"]');
        actMsg = "Empty elements are: \n";
        var actFlag = 0;

        for(var j = 0 ; j < textBoxesActor.length; j++){
            if( textBoxesActor[j].value.trim() == "" )
            {
                actMsg += "- " + textBoxesActor[j].placeholder + "\n";
                actFlag = 1;
            }
        }

        if( actFlag == 1)
        {
            alert(actMsg);
            return false;
        }

        return true;
 
    }

}
*/




