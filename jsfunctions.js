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
    
    return;

}



// Each Table has a series of textBoxes to enter in a specified div
// called by radio buttons to hide/show associated div inputs with radio boxes
function hideDiv(eleToHide,eleToShow){
    var divHide = document.getElementById(eleToHide);
    var divShow = document.getElementById(eleToShow);

    divHide.style.display = 'none';
    divShow.style.display = 'block';

    return;
}



// Client side validation of RadioButtons for the 'tableToChangeForm' operations avaliable. 
// Uses the .checked operaion on Radio Objects to verfiy input and insert.name into an alert if unchecked
function validateRadio()
{
    // validating radio buttons with arrays of inputs
    var radio1Buttons = document.tableToChangeForm.tableToChange;    
    var radio2Buttons = document.tableToChangeForm.operationValue;      
    var flag1 = 0;
    var flag2 = 0;
    alertText = "";

    // loops through each set of radioButtons. 
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

    // All combinations for flags are checked 
    if(flag1 == 0 && flag2 == 0) // No buttons are checked
    {
        alertText = alertText + "Please enter table and operation\n";

    } else if(flag1== 0){ // 1 set is checked 
        alertText = alertText + "Please enter Table for operation: " + radio2Buttons[j].value + "\n";

    } else if(flag2 == 0){  // the other is checked
        alertText = alertText + "Please enter operation on table: " + radio1Buttons[i].value + "\n";

    }

    if(flag1 == 0 || flag2 == 0){   // if either set hasn't been checked alert is sent
        alert("" + alertText);
        return false;
    }

    return true;
}



// Same function as above Radio button function, however uses a different form to the other function with less buttons. 
function searchValidateRadio()
{
    // validating radio buttons with arrays of inputs
    var radio1Buttons = document.tableToBeSearched.searchTable;    
    var flag1 = 0;
    var flag2 = 0;
    alertText = "";

    // loops through single radio button set
    for( var i = 0; i < radio1Buttons.length ; i++)
    {
        if(radio1Buttons[i].checked){
            flag1 = 1;
            break;
        }
    }

    // checks if no radio button has beeen checked
    if( flag1 == 0 )
    {
        alertText = alertText + "Please enter table to search\n";
    }

    // if statement to alert the user if a button isn't checked.
    if( flag1 == 0 ){
        alert("" + alertText);
        return false;
    }
        
    return true;
}



// Text Validation inputs for all text box input forms. Input parameters are the possible 'shown' divs on the site, and the function tests each
// to see if the div is active and shown. 
// For the shown div, each is looped through and tested if its empty, if it is its added to an alert string and notifies the user when submitted. 
// passes both possible 'active' input elements. 
function validateTextUniversal(textDiv,otherDiv)
{
    var x = document.getElementById(textDiv);
    msg = "";

    // if the window == 'none' it is not shown
    if( window.getComputedStyle(x).display === "none" )
    {
        // The table chosen is Movie and the Movie input fields are beind shown. 
        var divElementMovie = document.getElementById(otherDiv);
        var textBoxesMovie = divElementMovie.querySelectorAll('input[type="text"]');
        var intBoxesMovie = divElementMovie.querySelectorAll('input[type="number"]');
        msg = "Empty Elements are: \n";
        var mvFlag = 0;

        // Loops through each type=text input and validates. 
        for(var i = 0 ; i < textBoxesMovie.length; i++)
        {
            if( textBoxesMovie[i].value.trim() == "" )
            {
                msg += "- " + textBoxesMovie[i].placeholder + "\n";
                textBoxesMovie[i].classList.remove("valid");
                textBoxesMovie[i].classList.add("invalid");
                mvFlag = 1;
            } else {
                textBoxesMovie[i].classList.remove("invalid");
                textBoxesMovie[i].classList.add("valid");
            }
        }

        // loops throuch each of the type=number values and validates
        for(var k = 0 ; k < intBoxesMovie.length; k++)
        {
            x = intBoxesMovie[k].value;
            if(!/^[0-99]+$/.test(x))
            {
                msg += "- " + intBoxesMovie[k].placeholder + "\n";
                intBoxesMovie[k].classList.remove("valid");
                intBoxesMovie[k].classList.add("invalid");
                mvFlag = 1;
            } else {
                intBoxesMovie[k].classList.remove("invalid");
                intBoxesMovie[k].classList.add("valid");
            }
        }

        if( mvFlag == 1)
        {
            alert(msg);
            return false;
        }

        return true;

    } else {
        // The table chosen is Actor and the Actor input fields are being shown. 
        var divElementActor = document.getElementById(textDiv);
        var textBoxesActor = divElementActor.querySelectorAll('input[type="text"]');  
        var intBoxesActor = divElementActor.querySelectorAll('input[type="number"]');  
        actMsg = "Empty elements are: \n";
        var actFlag = 0;
        
        // Loops through each type=text input and validates. 
        for( var j = 0 ; j < textBoxesActor.length; j++ ){
            if( textBoxesActor[j].value.trim() == "" )
            {
                actMsg += "- " + textBoxesActor[j].placeholder + "\n";
                textBoxesActor[j].classList.remove("valid");
                textBoxesActor[j].classList.add("invalid");
                actFlag = 1;
            } else {
                textBoxesActor[j].classList.remove("invalid");
                textBoxesActor[j].classList.add("valid");
            } 
        }

        // loops throuch each of the type=number values and validates
        for(var m = 0 ; m < intBoxesActor.length; m++)
        {
            y = intBoxesActor[m].value;
            if(!/^[0-99]+$/.test(y))
            {
                actMsg += "- " + intBoxesActor[m].placeholder + "\n";
                intBoxesActor[m].classList.add("invalid");
                intBoxesActor[m].classList.remove("valid");
                actFlag = 1;
            } else {
                intBoxesActor[m].classList.add("valid");
                intBoxesActor[m].classList.remove("invalid");
            }
        }



        if( actFlag == 1 )
        {
            alert(actMsg);
            return false;
        }

        return true;
 
    }

}


