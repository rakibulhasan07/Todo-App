// Title input field select করা
const titleInput = document.querySelector('input#title');
// Description input field select করা
const descriptionInput = document.querySelector('input#description');
// Add button select করা
const addBtn = document.querySelector('button#add-btn');
// Todo table body select করা (যেখানে data show হবে)
const todoTableBody = document.querySelector('#todo-table-body');


/* Delete & Edit buttons */

// সব edit button select করা
const editBtn = document.querySelectorAll('.edit-btn');


/* check if todo exists or create one */
// localStorage এ যদি "todo" না থাকে তাহলে নতুন array create করবে
if(!localStorage.getItem("todo")){
    
    // নতুন array create
    let mkArray = new Array()

    // array কে JSON string করে localStorage এ save করা
    localStorage.setItem("todo", JSON.stringify(mkArray));
}

// let cItem = JSON.parse(localStorage.getItem("todo"));  // localStorage থেকে "todo" item কে JSON string থেকে JavaScript object এ convert করা
// if(cItem.length === 0){
//     document.querySelector('table thead').setAttribute('style', 'display: none;')  // যদি localStorage এ data থাকে তাহলে table head hide করা
//     document.querySelector('#emptyMsg').innerHTML = "Your todo list is empty. Please add some todos."  // যদি localStorage এ data না থাকে তাহলে empty message show করা
// } 
const loopTodos = () => {

    //Empty table first
        todoTableBody.innerHTML = "";

    let currentItems = JSON.parse(localStorage.getItem("todo"))  // localStorage থেকে "todo" item কে JSON string থেকে JavaScript object এ convert করা

    /* Loop through localStorage items */

    // serial number start
    let serial = 1

    // array এর প্রতিটি item এর জন্য loop
    currentItems.forEach((item, index) => {

        // table এর ভিতরে নতুন row add করা
        todoTableBody.innerHTML += `<tr id='singleTodo' data-itemid='${index}'>  <!-- প্রতিটি row কে unique id দেওয়া এবং data-itemid attribute দিয়ে index রাখা -->
            <td>${serial}</td>  <!-- serial number -->

            <td>${item.title}</td>  <!-- todo title -->

            <td>${item.description}</td> <!-- todo description -->

            <td>
                <!-- edit button -->
                <button class="btn-edit">Edit</button>

                <!-- delete button -->
                <button class="btn-delete">Delete</button>
        </td>
        </tr>`

        // serial number increase
        serial++;
        deleteTodo()// function call করে delete button এর click event listener attach করা
    })
}



const addTodo = () => {
    addBtn.addEventListener('click', () => {

        let todoTitle = titleInput.value.trim();  // title input field থেকে value নেওয়া
        let todoDescription = descriptionInput.value.trim();  // description input field থেকে value নেওয়া

        let  newTodo = {
            title: todoTitle,
            description: todoDescription
        }
        console.log(newTodo)
        // get current todo items from localStorage
        let currentItems = JSON.parse(localStorage.getItem("todo"));

        // add new todo item to current items array
        currentItems.push(newTodo);

        // .localStorage.clear();  // localStorage clear করা যাতে duplicate data না থাকে

        // save updated items array back to localStorage
        localStorage.setItem("todo", JSON.stringify(currentItems));
       
        //empty input fields after adding todo
        titleInput.value = "";
        descriptionInput.value = "";

        //Empty table first
        todoTableBody.innerHTML = "";
        loopTodos();  // refresh the todo list
        
    })
}
loopTodos()  // function call করে localStorage থেকে data load করা এবং table এ show করা


/* Delete todo item */
function deleteTodo()  {
    const allTodos = document.querySelectorAll('#singleTodo');  // সব todo row select করা
    allTodos.forEach((todo) => {
        todo.querySelector('.btn-delete').addEventListener('click', () => {

            let currentItems = JSON.parse(localStorage.getItem("todo"));  // localStorage থেকে "todo" item কে JSON string থেকে JavaScript object এ convert করা
            let clickedIndex = Number(todo.getAttribute('data-itemid'));  // click করা row এর index নেওয়া
            let remainingItems =  currentItems.filter((item, index) => {

                return index !== clickedIndex;  // clicked index ছাড়া বাকি items return করা
            })
                // clear the localStorage
                localStorage.clear();

                // save the updated items array back to localStorage
                localStorage.setItem("todo", JSON.stringify(remainingItems));

                loopTodos();  // refresh the todo list

        })
    })
}
deleteTodo()  // function call করে delete button এর click event listener attach করা
addTodo()  // function call করে add button এর click event listener attach করা






