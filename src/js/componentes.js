import { Todo } from "../clases";
import { todoList } from '../index';
// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


let k = 0;
export const crearTodoHtml = (todo) => {

    const htmlTodo = `
       <li class="${ (todo.cmpletado) ? 'completed' : ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}> 
							<label>${ todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
                    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}

export const actualizaPendientes = (todoList) => {

    const ctaPendientes = document.querySelector('strong');

    ctaPendientes.innerText = todoList.cuentaPendientes();


};
// export const cuentaPendientes = () => {

//     anchorFiltros.forEach( elem => elem.classList){


//     };



//     return('return '+ todoList.todo.length);

// }

///Eventos

txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElement = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if (nombreElement.includes('input')) { // click en check

        todoList.marcarCompletado(todoId);
        todoElement.classList.toggle('completed');
        todoList.guardarLocalStorage();

    } else if (nombreElement.includes('button')) { // hay que borrar el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElement);

    }

    //console.log(nombreElement);
    actualizaPendientes(todoList);
});

btnBorrar.addEventListener('click', (event) => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {

            divTodoList.removeChild(elemento);

        }
    }


});

ulFilters.addEventListener('click', (event) => {

    const filtro = event.target.text;
    console.log(filtro);
    if (!filtro) { return; }; // SI no es undefined

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');

    console.log(event.target);

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden'); // Remueve la clase 'hidden' de los elementos html
        const completado = elemento.classList.contains('completed');
        console.log(completado);
        switch (filtro) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;

        }

    }


});