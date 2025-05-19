import html from './app.html?raw';
import todoStore, { Filters } from "../store/todo.store";
import { renderPending, renderTodos } from './use-cases';

const elementIDs = {

    TodoList : '.todo-list',
    NewTodoInput : '#new-todo-input',
    ClearCompleted : '.clear-completed',
    FiltersTodos : '.filtro',
    PendingCountLabel : '#pending-count',
  
};

export const App  = ( elementId ) => {

    const displayTodos = () =>{

        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIDs.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIDs.PendingCountLabel);
    }


    (()=>{ 
        const app = document.createElement('div');
        app.innerHTML = html; 
        document.querySelector(elementId).append(app)
        displayTodos();
    })();

     //Referencias HTML 

    const newDesccriptionInput = document.querySelector(elementIDs.NewTodoInput);
    const TodoListUL = document.querySelector(elementIDs.TodoList);
    const clearCompletedButton = document.querySelector(elementIDs.ClearCompleted);
    const FiltersLIs = document.querySelectorAll(elementIDs.FiltersTodos);

    newDesccriptionInput.addEventListener ('keyup', (event) =>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });


    TodoListUL.addEventListener('click', (event) =>{

        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();

    });

    TodoListUL.addEventListener('click', (event) =>{

        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        
        if(!element || !isDestroyElement ) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () =>{

        todoStore.deleteCompleted();
        displayTodos();
    });

    FiltersLIs.forEach(element =>{
        element.addEventListener('click' ,(element) =>{
            FiltersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                        todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                        todoStore.setFilter(Filters.Pending)
                    break;    
                case 'Completados':
                        todoStore.setFilter(Filters.Completed)
                    break;
            }
            displayTodos();
        });
    });
};