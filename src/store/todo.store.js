import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All : 'all',
    Pending : 'Pending',
    Completed : 'Completed'

}
const state = {
    todos : [
        new Todo('Piedra'),
        new Todo('Obsidiana'),
        new Todo('palo'),
    ],
    filter : Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore😣');
};

const loadStore = () =>{

    if(!localStorage.getItem('state'))return ;

    const { todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;
}

const getTodos = (filter = Filters.All) =>{
    switch (filter) {
        case Filters.All:
            return [...state.todos]
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default: 
            throw new Error (`Option ${filter} is not Valid.`)
    
    }
}

const addTodo = ( description) =>{
    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveStateTolocalStorage();
}



const saveStateTolocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state));
};

const toggleTodo = (todoId) =>{
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId){
            todo.done = !todo.done   
        }
        return todo;
    });
    saveStateTolocalStorage();
}

const deleteCompleted = () =>{
    state.todos = state.todos.filter (todo => !todo.done)
    saveStateTolocalStorage();
}

const deleteTodo = (todoId) =>{
    state.todos = state.todos.filter (todo => todo.id !== todoId)
    saveStateTolocalStorage();
}

const setFilter = (newFilter = Filters.All) =>{
    state.filter = newFilter;
    saveStateTolocalStorage();
}

const getCurrentFilter = () =>{
    return state.filter;
}

export default {
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
    getTodos,
    addTodo,
};