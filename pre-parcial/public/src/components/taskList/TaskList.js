import TaskItem from '../taskItem/TaskItem.js';

class TaskList extends HTMLElement {
    constructor() {
        super();
        // Crea un Shadow DOM para encapsular el estilo y la estructura interna del componente
        this.attachShadow({ mode: 'open' });
        this.tasks = []; // Array para almacenar todas las tareas
    }

    // Método del ciclo de vida llamado cuando el elemento se inserta en el DOM
    connectedCallback() {
        // Renderiza el contenido del componente
        this.render();
        // Agrega los event listeners necesarios
        this.addEventListeners();
    }

    // Método para añadir una nueva tarea a la lista
    addTask(title, description) {
        // Crea un nuevo objeto de tarea con título, descripción y estado "pending"
        const newTask = { title, description, status: 'pending' };
        // Añade la nueva tarea al array de tareas
        this.tasks.push(newTask);
        // Renderiza todas las tareas, incluyendo la nueva
        this.renderTasks();
    }

    // Método para renderizar todas las tareas en la lista
    renderTasks() {
        // Selecciona el contenedor de la lista de tareas en el Shadow DOM
        const taskListContainer = this.shadowRoot.querySelector('.task-list');
        // Limpia cualquier contenido previo en el contenedor
        taskListContainer.innerHTML = ''; 

        // Itera sobre el array de tareas y crea un `<task-item>` para cada una
        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('task-item');
            taskItem.setAttribute('title', task.title);
            taskItem.setAttribute('description', task.description);
            taskItem.setAttribute('status', task.status);

            // Escucha el evento `statusChanged` desde cada `task-item` para actualizar el estado
            taskItem.addEventListener('statusChanged', (event) => {
                // Actualiza el estado de la tarea en el array
                this.tasks[index].status = event.detail.newStatus;
                // Vuelve a renderizar todas las tareas para reflejar los cambios
                this.renderTasks();
            });

            // Añade el `task-item` al contenedor de la lista de tareas
            taskListContainer.appendChild(taskItem);
        });
    }

    // Método para configurar los event listeners del formulario de tareas
    addEventListeners() {
        // Selecciona el formulario en el Shadow DOM y agrega un listener para el evento `submit`
        const form = this.shadowRoot.querySelector('.task-form');
        form.addEventListener('submit', (event) => {
            // Previene que el formulario se envíe de forma estándar (refrescar la página)
            event.preventDefault();

            // Obtiene los valores de los campos del formulario
            const titleInput = this.shadowRoot.querySelector('#title');
            const descriptionInput = this.shadowRoot.querySelector('#description');
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();

            // Añade la tarea solo si el título y la descripción no están vacíos
            if (title && description) {
                this.addTask(title, description);
                // Limpia los campos del formulario
                titleInput.value = '';
                descriptionInput.value = '';
            }
        });
    }

    // Método para renderizar la estructura inicial del componente
    render() {
        // Define el contenido HTML que se insertará en el Shadow DOM
        this.shadowRoot.innerHTML = `
            <div class="task-list-container">
                <form class="task-form">
                    <input type="text" id="title" placeholder="Task title" required>
                    <textarea id="description" placeholder="Task description" required></textarea>
                    <button type="submit">Add task</button>
                </form>
                <div class="task-list"></div>
            </div>
        `;

        // Renderiza todas las tareas actuales en la lista
        this.renderTasks();
    }
}

// Define el custom element `<task-list>` basado en la clase `TaskList`
customElements.define('task-list', TaskList);
export default TaskList;
