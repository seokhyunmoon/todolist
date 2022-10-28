let todos = []; /* (예) [{ id: 1, content: "중간 프로젝트 DUE 2022-10-28 23:59", isCompleted: false }]; */
let id = 0; // set initial id value
let isAllCompleted = false; // check all todos

const todoListElem = $('#todo-container');

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true );
}

const setIsAllCompleted = (bool) => {isAllCompleted = bool};

const completeAll = () => {
    // const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: true }) )
    // setTodos(newTodos)

}

const incompleteAll = () => {
    const newTodos =  getAllTodos().map(todo => ({...todo, isCompleted: false }) );
    setTodos(newTodos)
}

const checkIsAllCompleted = () => {
    if(getAllTodos().length === getCompletedTodos().length ){
        setIsAllCompleted(true);
        completeAllBtnElem.classList.add('checked');
    }else {
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked');
    }
}

const onClickCompleteAll = () => {
    if(!getAllTodos().length){
        return; 
    } 
    if(isAllCompleted){
        incompleteAll(); 
    } else {
        completeAll();
    }
    setIsAllCompleted(!isAllCompleted); 
    paintTodos(); 
    setLeftItems()
}

const appendTodos = (text) => {
    let newId = ++id;
    const newTodos = todos.concat({ id: newId, isCompleted: false, content: text });
    setTodos(newTodos);
    paintTodos();
}

const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId );
    setTodos(newTodos);
    paintTodos();
}

const completeTodo = (completeId) => {
    
    /*
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo,  isCompleted: !todo.isCompleted} : todo );
    setTodos(newTodos);
    paintTodos();
    */


    $.each(todos, (_, todo) => {
        if (todo.id === completeId) {
            todo.isCompleted = !todo.isCompleted;
        }
    });
    paintTodos();

}

 /*
const completeAll = () => {
    if (myCheckbox.checked == true){
        checkboxes.forEach(function(checkbox){
            checkbox.checked = true;
        });
    }
    else{
        checkboxes.forEach(function(checkbox){
            checkbox.checked = false;
        });
    }
} */

const paintTodos = () => {
    todoListElem.empty();
    $.each(todos, paintTodo);
}

const paintTodo = (_, todo) => {

    const todoItemElem = $('<div>').addClass('todo-item col col-12 p-2 input-group');
    
    const checkboxElem = $('<div>').addClass('checkbox input-group-prepend text-dark').text(todo.isCompleted ? "✔" : "☐");
    //const checkboxElem = document.createElement('div');
    //checkboxElem.classList.add('checkbox');
    checkboxElem.click(() => completeTodo(todo.id));

    const delBtnElem = $('<button>').addClass('delBtn button').html(todo.isDeleted = "X");
    delBtnElem.click(() => deleteTodo(todo.id));
    
    // if(todo.isCompleted) {
    //     todoItemElem.classList.add('checked');
    //     checkboxElem.innerText = '✔';
    // }

    const todoElem = $('<input>').attr("type", "text").attr("disabled", true).addClass("todo form-control").val(todo.content);
    todoItemElem.append(checkboxElem);
    todoItemElem.append(todoElem);
    todoItemElem.append(delBtnElem);
    todoListElem.append(todoItemElem);

}

const init = () => {

    todoAddBtnElem.on("click", () => {
        appendTodos(todoInputElem.val()); todoInputElem.val('');
    });

    todoInputElem.on('keypress', (e) => {
        if (e.key === 'Enter') {
            appendTodos($(e.target).val()); $(e.target).val('');
        }
    });
    paintTodos();

    
}

$(function () {
    init();
}); 

const init_1 = () => {
    // todoCheckAllBtnElem.on("click", () => {

    // });
    todoCheckAllBtnElem.addEventListener('click',  onClickCompleteAll);

}

$(function () {
    init_1();
});

const todoInputElem = $('#todo-input');
const todoAddBtnElem = $("#todo-btn-add");
const todoCheckAllBtnElem = $("todo-check-all");



const todoCompletedBtnElem = $("todo-btn-completed");
const todoActiveBtnElem = $("todo-btn-active");
const todoAllBtnElem = $("todo-btn-all");
const todoClearCompletedBtnElem = $("#todo-clear-completed");

/*
const init_buttons = () => {
    todoCompletedBtnElem.on("click", () = > {

    });
}

$(function() {
    init_buttons();
});
*/

/* 
var total = 0;
total ++1;
$("#total span").text(total);
*/
