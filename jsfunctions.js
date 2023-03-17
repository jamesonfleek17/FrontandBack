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

    // sets a hidden value to indicate to the php form which set of inputs are being used. 
    // 1 = value is being shown / 0 = value being hidden
    var x = divShow.querySelectorAll('input[type="hidden"]');
    var y = divHide.querySelectorAll('input[type="hidden"]');

    x[0].value = 1;
    y[0].value = 0;


    // alert("value of " + eleToShow + ": " +  x[0].value + "\n" + "value of " + eleToHide + ": " + y[0].value);

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
        var divElement = document.getElementById(otherDiv);
    } else {
        // The table chosen is Actor and the Actor input fields are being shown. 
        var divElement = document.getElementById(textDiv);
    }
    
    var textBoxes = divElement.querySelectorAll('input[type="text"]');
    var intBoxes = divElement.querySelectorAll('input[type="number"]');
    msg = "Empty Elements are: \n";
    var Flag = 0;

    // Loops through each type=text input and validates. 
    for(var i = 0 ; i < textBoxes.length; i++)
    {
        if( textBoxes[i].value.trim() == "" )
        {
            msg += "- " + textBoxes[i].placeholder + "\n";
            textBoxes[i].classList.remove("valid");
            textBoxes[i].classList.add("invalid");
            Flag = 1;
        } else {
            textBoxes[i].classList.remove("invalid");
            textBoxes[i].classList.add("valid");
        }
    }

    // loops throuch each of the type=number values and validates
    for( var k = 0 ; k < intBoxes.length; k++ )
    {
        x = intBoxes[k].value;
        if(!/^[0-99]+$/.test(x))
        {
            msg += "- " + intBoxes[k].placeholder + "\n";
            intBoxes[k].classList.remove("valid");
            intBoxes[k].classList.add("invalid");
            Flag = 1;
        } else {
            intBoxes[k].classList.remove("invalid");
            intBoxes[k].classList.add("valid");
        }
    }

    if( Flag == 1 )
    {
        alert(msg);
        return false;
    }

    return true;

}