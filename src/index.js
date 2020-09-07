import './styles.css';

// import { Todo } from './clases/todo.class.js';
// import { TodoList } from './clases/todo-list-class.js';

import {Todo, TodoList} from './clases';
import { crearTodoHtml, cuentaPendientes, actualizaPendientes } from './js/componentes';


export const todoList = new TodoList();


// Esto es lo mismo 
// --> todoList.todo.forEach(crearTodoHtml);
//Que esto, cuando el atgumento es lo unico que se retorna (todo)
todoList.todo.forEach(todo => crearTodoHtml( todo ));

//console.log(todoList.cuentaPendientes());
 actualizaPendientes(todoList);
