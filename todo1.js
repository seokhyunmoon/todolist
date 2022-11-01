let todos = [{ id: 1, content: "중간 프로젝트 DUE 2022-10-28 23:59", isCompleted: false }];
let id = 1; // set initial id value


const todoListElem = $('#todo-container');

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

const appendTodos = (text) => {
    let newId = ++id;
    const newTodos = todos.concat({ id: newId, isCompleted: false, content: text });
    setTodos(newTodos);
    paintTodos();
}

const deleteTodo = (deleteId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== deleteId );
    setTodos(newTodos);
    paintTodos();
}

const completeTodo = (completeId) => {
    $.each(todos, (_, todo) => {
        if (todo.id === completeId) {
            todo.isCompleted = !todo.isCompleted;
        }
    });
    paintTodos();
}

const completeAll = (myCheckbox) => {
    const checkboxes = $("input[type='checkbox']:gt(0)");
    $.each(checkboxes, (_, checkbox) => {
        if (myCheckbox.checked == true) {
            checkboxes.checked = true;
        } else {
            checkboxes.checked = false;
        }
    });
    paintTodos();
}

const paintTodos = () => {
    todoListElem.empty();
    $.each(todos, paintTodo);
}

const paintTodo = (_, todo) => {

    // 리스트 생성
    const todoItemElem = $('<div>').addClass('todo-item col col-12 p-2 input-group');
    
    // 체크 박스 생성 
    const checkboxElem = $('<div>').addClass('checkbox').text(todo.isCompleted ? "✔" : "☐");
    checkboxElem.click(() => completeTodo(todo.id));
    // 삭제 버튼 생성
    const delBtnElem = $('<button>').addClass('delBtn button').html("X");
    delBtnElem.click(() => deleteTodo(todo.id));

    // 리스트 구성 요소 합치기
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

    todoClearCompletedBtnElem.on("click", () => completeAll(todo.isCompleted));

    paintTodos();

}

$(function () {
    init();
}); 



const todoInputElem = $('#todo-input');
const todoAddBtnElem = $("#todo-btn-add");
const todoCheckAllBtnElem = $("todo-check-all");



const todoCompletedBtnElem = $("todo-btn-completed");
const todoActiveBtnElem = $("todo-btn-active");
const todoAllBtnElem = $("todo-btn-all");
const todoClearCompletedBtnElem = $("#todo-clear-completed");

/* 
var total = 0;
total ++1;
$("#total span").text(total);
*/
