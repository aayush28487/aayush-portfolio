// document.addEventListener("DOMContentLoaded", () => {
//     const addTodoBtn = document.getElementById("addTodoBtn");
//     if (!addTodoBtn) return;

//     addTodoBtn.addEventListener("click", () => {
//         console.log("hey i just click button");
//     });
// });

document.addEventListener("DOMContentLoaded", () => {

   const addTodoBtn = document.getElementById("addTodoBtn");
   const inputTag = document.getElementById("todoInput");
   const todoListUL = document.getElementById("todoList");
   const remaining = document.getElementById("remaining-count");
   const clearCompletedBtn = document.getElementById("clearCompletedBtn");
   let todotext;

   let todos = [];
   const todostring = localStorage.getItem("todos");
   if (todostring) {
      todos = JSON.parse(todostring)
   }

   const populateTodos = () => {
      let string = "";
      for (const todo of todos) {
         string += `<li id="todo-${todo.id}" class="todo-item${todo.isCompleted ? " completed" : ""}" >
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
      }
      todoListUL.innerHTML = string;

      //handle checkbox change

      const todoCheckbox = document.querySelectorAll(".todo-checkbox");
      todoCheckbox.forEach((element) => {
         element.addEventListener("click", (e) => {
            if (e.target.checked) {
               e.target.parentElement.classList.add("completed");
               // grabb thes todo from todos array and update the todos array to set this todos isCompleted attribute as true
               todos = todos.map((todo) => {
                  if ("todo-" + todo.id == e.target.parentElement.id) {
                     return { ...todo, isCompleted: true }
                  }
                  else {
                     return todo;
                  }
               })
               localStorage.setItem("todos", JSON.stringify(todos));
            }
            else {
               e.target.parentElement.classList.remove("completed");
               // grabb thes todo from todos array and update the todos array to set this todos isCompleted attribute as false
               todos = todos.map((todo) => {
                  if ("todo-" + todo.id == e.target.parentElement.id) {
                     return { ...todo, isCompleted: false }
                  }
                  else {
                     return todo;
                  }
               })
            }
           remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
            localStorage.setItem("todos", JSON.stringify(todos));
         }
         )
      })

      //handle clear completed button click
      clearCompletedBtn.addEventListener("click", () => {
         todos = todos.filter((todo) => todo.isCompleted == false);
         populateTodos();
         localStorage.setItem("todos", JSON.stringify(todos));
      });

      //handle delete button click
      let deleteBtns = document.querySelectorAll(".delete-btn");
      deleteBtns.forEach((element) => {
         element.addEventListener("click", (e) => {
            const confirmation = confirm("Are you sure you want to delete this todo?");
            if (confirmation) {
               todos = todos.filter((todo) => {
                  return ("todo-" + todo.id) !== (e.target.parentElement.id);
               })
                remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
               localStorage.setItem("todos", JSON.stringify(todos));
               populateTodos();
            }

         })
      })

   };


      addTodoBtn.addEventListener("click", () => {
         todotext = inputTag.value;
         //small todo: validate the input field is not empty
         if (todotext.trim().length < 4) {
            alert("Todo should be atleast 4 characters long");
            return;
         }

         inputTag.value = "";
         let todo = {
            id: todos.length + 1,
            title: todotext,
            isCompleted: false
         }
         todos.push(todo);
         localStorage.setItem("todos", JSON.stringify(todos));
        remaining.innerHTML = todos.filter((item) => {return item.isCompleted != true}).length;
         populateTodos();
      });
      populateTodos();




   });
