import { computed, observable } from "mobx";

// esta clase todo se pudo haber echo en otro archivo separado, pero para mantener las cosas simples se dejo aqui.
class Todo {
  @observable value
  @observable id
  @observable complete

  constructor(value) {
    this.value = value
    this.id = Date.now()
    this.complete = false
  }
}

class TodoStore {
  @observable todos = []
  @observable filter = ""
  // propiedad @computed, cada vez que se cambia un valor @observable @computed tambien es actualizado. 
  @computed get filteredTodos(){
    // RegExp se refiere al Regular Expresion, dos parametros, string a bucar y opciones, en opciones pusimos 'i' para que la busqueda con el metodo .test sea case insesitive.
    var matchesFilter = new RegExp(this.filter, "i")
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value ))
  }

  createTodo(value) {
    // .push es para agregar nuevos elementos al array
    //se agrego un nuevo objeto Todo con el value igualado alo que escribieron
    this.todos.push(new Todo(value))
  }

  //  con () => hacemos bind de este metodo a este contexto para que solo sea ejecutado aqui
  clearComplete = () => {
    // con mobx no se pueden eliminar registros de una array tan facilmente por que los declaramos como @observable, por las referencias que el array ya tiene, entonces se hace un replace con el nuevo array.
    // Solo me interesan los todo que no ensten completados, entonces los pongo en true y los filtro al siguiente arreglo para remplazarlo.
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

var store = window.store = new TodoStore;

export default store;
