const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const addBtn = document.querySelector("#add-btn");
const todoTableBody = document.querySelector("#todo-table-body");
const searchInput = document.querySelector("#search");

let editIndex = null;

if(!localStorage.getItem("todo")){
localStorage.setItem("todo",JSON.stringify([]))
}

function loopTodos(filter=""){

let todos = JSON.parse(localStorage.getItem("todo"))

todoTableBody.innerHTML=""

let serial = 1

todos.forEach((item,index)=>{

if(item.title.toLowerCase().includes(filter.toLowerCase()) ||
item.description.toLowerCase().includes(filter.toLowerCase())){

todoTableBody.innerHTML+=`

<tr data-id="${index}">

<td>${serial}</td>

<td class="${item.completed ? 'completed':''}">
${item.title}
</td>

<td class="${item.completed ? 'completed':''}">
${item.description}
</td>

<td>
<input type="checkbox" class="complete-check" ${item.completed ? "checked":""}>
</td>

<td>

<button class="edit-btn">Edit</button>
<button class="delete-btn">Delete</button>

</td>

</tr>
`

serial++

}

})

deleteTodo()
editTodo()
completeTodo()

}

addBtn.addEventListener("click",()=>{

let title = titleInput.value.trim()
let desc = descriptionInput.value.trim()

if(title==="" || desc===""){
alert("Enter title & description")
return
}

let todos = JSON.parse(localStorage.getItem("todo"))

if(editIndex===null){

todos.push({
title:title,
description:desc,
completed:false
})

}else{

todos[editIndex].title=title
todos[editIndex].description=desc

editIndex=null
addBtn.textContent="Add Todo"

}

localStorage.setItem("todo",JSON.stringify(todos))

titleInput.value=""
descriptionInput.value=""

loopTodos()

})


function deleteTodo(){

document.querySelectorAll(".delete-btn").forEach(btn=>{

btn.addEventListener("click",(e)=>{

let index = e.target.closest("tr").dataset.id

let todos = JSON.parse(localStorage.getItem("todo"))

todos.splice(index,1)

localStorage.setItem("todo",JSON.stringify(todos))

loopTodos()

})

})

}


function editTodo(){

document.querySelectorAll(".edit-btn").forEach(btn=>{

btn.addEventListener("click",(e)=>{

let index = e.target.closest("tr").dataset.id

let todos = JSON.parse(localStorage.getItem("todo"))

titleInput.value = todos[index].title
descriptionInput.value = todos[index].description

editIndex=index

addBtn.textContent="Update"

})

})

}


function completeTodo(){

document.querySelectorAll(".complete-check").forEach(check=>{

check.addEventListener("change",(e)=>{

let index = e.target.closest("tr").dataset.id

let todos = JSON.parse(localStorage.getItem("todo"))

todos[index].completed = e.target.checked

localStorage.setItem("todo",JSON.stringify(todos))

loopTodos()

})

})

}


searchInput.addEventListener("input",(e)=>{

loopTodos(e.target.value)

})


loopTodos()