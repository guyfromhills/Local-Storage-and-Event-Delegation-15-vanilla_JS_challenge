// Main Tasks
// 1. Push the new items in items array
// 2. Add the items in the itemslist 
// 3. Make items in itemslist appear checked/unchecked based on done property of array item
// 4. Make itemslist persists on reloading page 
// 5. Persists toggling of checkbox




// grab items added to input type text
const addItems = document.querySelector(".add-items");

// grab itemsList
const itemsList = document.querySelector(".plates");

// instantiating an empty array for items to be added to input text form
const items = JSON.parse(localStorage.getItem("items")) || [];            //since on refresh items is empty we get data from local storage or fall back to empty array

//method for adding item
function addItem(e)
{
    // sub task 1
    // prevent page from loading as form would try to send data to server
    e.preventDefault();

    
    // sub task 2
    // grabbing text from input type text to change it into object 
    const text = (this.querySelector("[name='item']")).value;                 //this represents form, grab the value of input

    //instantiating an item object
    const item = {
        text : text,
        done : "false"                                                       //default state : not checked
    }

    //pushing item added inside items array
    items.push(item);

    //passing in items for plates and itemsList for platesList in method
    populateList(items, itemsList);

    //using api set item for setting in key and value
    //local storage only takes strings
    //stringify will convert objects in arrays into JSON string equivalent
    localStorage.setItem("items", JSON.stringify(items));

    this.reset();                                                           //reset is a method of form element


}

    // sub task 3
    //make populate list function to add items from items array to itemslist

//method to make itemsList
function populateList(plates=[], platesList)                                //empty array so that it does not break
{

    //map would return an array, but we want string so we use join()
    const html = plates.map( function (plate,i){
        
        //adding if/else to resolve checked/unchecked issue
        return `
        <li>
         <input type="checkbox" data-index="${i}" id="item${i}" 
         if( ${plate.done} === true)
         {
             checked;
         }
         else
         {
              '';
         }
         >
         <label for="item${i}">${plate.text} </label> 
        </li> 


        `;
        
    }).join('');
    platesList.innerHTML = html;

}

function toggleDone(e)
{

    if( !e.target.matches("input"))
    {
        return true;
    }                                    //matches API

    // sub task 4
    // In the items array find the one that got checked and set it's done property to true

    const el = e.target;
    const index = el.dataset.index;

    items[index].done = !items[index].done ;                //change the property
    localStorage.setItem("items", JSON.stringify(items));  //save in local storage
    populateList(items, itemsList);                         //visually update 



}


// if submit in input type text happens, call add item function
addItems.addEventListener("submit", addItem);


//event delegation ( we listen for, on something higher and inside it we check if it's the actual thing we want )
//if unordered list gets clicked, call toggle done method
itemsList.addEventListener("click", toggleDone);



//on page load
populateList(items, itemsList );                               //but items dont exists on page load

//event delegation 
//need: Since inputs were created after we listen for them, they wont have any effect on inputs introduced after we listen for them 
//action : We search for element that exists at the time of listening ( usually a parent ) and add event listener to it




