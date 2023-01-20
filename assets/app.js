const todolistForm = document.querySelector(`form`);
const todolistBox = document.querySelector(`.todolis__box`);
const todolisFormInp = document.querySelector(`.todolist__form-input`);
const todolistDeleteAll = document.querySelector(`.todolist__form-delete-all`);
const todolistCollection = document.getElementById(`todolist__collection`);

const closeEl = document.querySelector(`.fa-close`);
todolistBox.addEventListener(`click`, (e) => {
  todolistBox.classList.toggle(`style-todolist-box`);
  closeEl.style = `display: block`;
});

closeEl.addEventListener(`click`, (e) => {
  todolisFormInp.value = '';
});

todolistForm.addEventListener(`submit`, addTodo);
function addTodo(e) {
  e.preventDefault();
  const inputValue = todolisFormInp.value;
  if (inputValue.trim().length >= 3) {
    const liTodolist = document.createElement("li");
    liTodolist.className = `collection__item`;
    const pTodolist = document.createElement("p");
    // pTodolist.innerText = inputValue;
    pTodolist.appendChild(document.createTextNode(inputValue));
    liTodolist.appendChild(pTodolist);
    const ulTodolist = document.createElement("ul");
    const ulli = document.createElement("li");
    const time = new Date();
    const now = `${time.getHours().toString().padStart(2, "0")} : ${time
      .getMinutes()
      .toString()
      .padStart(2, "0")} : ${time.getSeconds().toString().padStart(2, "0")}`;
    ulli.innerHTML = `<button class="btn btn-complete"> <i class= "fas fa-check-circle"></i> <br> Complete </button>
    <button class="btn btn-edit"> <i class= "fas fa-edit"></i> <br> Edit </button>
    <button class="btn btn-time"> <i class= "fas fa-clock"></i> <br> ${now} </button>
    <button class="btn btn-delete"> <i class= "fas fa-trash"></i> <br> Delete </button>`;

    ulTodolist.appendChild(ulli);
    liTodolist.appendChild(ulTodolist);
    todolistCollection.prepend(liTodolist);
    todolisFormInp.value = "";
  } else {
    alert("Enter more than 2 characters");
  }
}

todolistDeleteAll.addEventListener(`click`, () => {
  if (todolistCollection.firstChild) {
    const userResponse = confirm("Are you sure");

    if (userResponse === true) {
      // 1
      // todolistCollection.innerHTML = "";
      // 2
      while (todolistCollection.firstChild) {
        todolistCollection.removeChild(todolistCollection.firstChild);
      }
    }
  }
});

todolistCollection.addEventListener(`click`, (e) => {
  if (e.target.classList.contains("btn-complete")) {
    e.target.parentElement.parentElement.previousSibling.classList.toggle(
      "completed"
    );
  } else if(e.target.classList.contains("btn-edit")){
    if(e.target.parentElement.parentElement.previousSibling.hasAttribute("contenteditable")){
      e.target.parentElement.parentElement.previousSibling.removeAttribute("contenteditable");
      e.target.innerHTML = '<i class="fas fa-edit"></i> <br> Edit';
      e.target.style = `background: gold`;
    }
    else{
      e.target.parentElement.parentElement.previousSibling.setAttribute("contenteditable", true)
      e.target.innerHTML = '<i class="fas fa-check-double"></i> <br> Done';
      e.target.style = `background: purple`;

    }
  } else if(e.target.classList.contains("btn-time")){

      let date = new Date();
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      let session = "AM";
    
      if(hh === 0){
        hh = 12;
      }
      if(hh > 12){
        hh = hh-12;
        session = "PM";
      }
    
      hh = (hh < 10) ? "0" + hh : hh;
      mm = (mm < 10) ? "0" + mm : mm;
      ss = (ss < 10) ? "0" + ss : ss;
    
      let time = hh + ":" + mm + ":" + ss + session;
      e.target.innerHTML = time;
      
  }  else if (e.target.classList.contains("btn-delete")) {
    const isAgreedToDelete = confirm("Are you sure to delete this item?");
    if (isAgreedToDelete === true) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }
});
//sass --watch assets/style.scss assets/style.css