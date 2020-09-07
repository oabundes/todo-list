import { Todo } from "./todo.class";


export class TodoList {

    constructor() {

        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {

        this.todo.push(todo);
        this.guardarLocalStorage();

    }

    eliminarTodo(id) {

        this.todo = this.todo.filter(todo => todo.id != id)
        this.guardarLocalStorage();

    }

    marcarCompletado(id) {

        for (const todo of this.todo) {

            console.log(id, todo.id);

            if (todo.id == id) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;

            }
        }

    }


    cuentaPendientes() {
        let i = 0;
        for (const todo of this.todo) {

            if (!todo.completado) { i++; }
        }

        return i;
    }


    eliminarCompletados() {

        this.todo = this.todo.filter(todo => !todo.completado)
        this.guardarLocalStorage();

    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todo));

    }

    cargarLocalStorage() {

        // if (localStorage.getItem('todo')) {

        //     this.todo = JSON.parse(localStorage.getItem('todo'));

        // } else {
        //     this.todo = [];

        // }

        this.todo = (localStorage.getItem('todo'))
            ? JSON.parse(localStorage.getItem('todo'))
            : [];

        // Convierte los objetos en instancias de "Todo"
        this.todo = this.todo.map(obj => Todo.fromJson(obj));
        // Es lo mismo que
        //--> this.todo = this.todo.map(Todo.fromJson);
    }

}