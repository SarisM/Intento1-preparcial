class TaskItem extends HTMLElement {
    // Especifica qué atributos deben ser observados para detectar cambios
    static get observedAttributes() {
        return ['title', 'description', 'status'];
    }

    constructor() {
        super();
        // Crea un Shadow DOM para encapsular el estilo y la estructura interna del componente
        this.attachShadow({ mode: 'open' });
    }

    // Método del ciclo de vida llamado cuando el elemento se inserta en el DOM
    connectedCallback() {
        // Renderiza el contenido del componente
        this.render();
        // Agrega los event listeners necesarios
        this.addEventListeners();
    }

    // Método del ciclo de vida llamado cuando un atributo observado cambia
    attributeChangedCallback(propName, oldValue, newValue) {
        // Verifica si el valor del atributo ha cambiado realmente
        if (oldValue !== newValue) {
            // Actualiza el atributo interno y vuelve a renderizar el componente
            this[propName] = newValue;
            this.render();
        }
    }

    // Método para alternar el estado de la tarea (completada o pendiente)
    toggleStatus() {
        // Obtiene el estado actual de la tarea
        const currentStatus = this.getAttribute('status');
        // Determina el nuevo estado basado en el estado actual
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        // Actualiza el atributo `status` con el nuevo valor
        this.setAttribute('status', newStatus);
        
        // Despacha un evento personalizado para notificar al componente padre sobre el cambio de estado
        this.dispatchEvent(new CustomEvent('statusChanged', {
            detail: { newStatus },  // Incluye el nuevo estado en el detalle del evento
            bubbles: true,          // Permite que el evento burbujee hacia arriba en el DOM
            composed: true          // Permite que el evento atraviese el Shadow DOM
        }));
    }

    // Método para configurar los event listeners del botón de alternar estado
    addEventListeners() {
        // Selecciona el botón dentro del Shadow DOM y agrega un listener para el clic
        const toggleButton = this.shadowRoot.querySelector('.toggle-status');
        toggleButton.addEventListener('click', () => this.toggleStatus());
    }

    // Método para renderizar el contenido del componente
    render() {
        // Obtiene los valores actuales de los atributos del componente
        const title = this.getAttribute('title') || 'No Title';
        const description = this.getAttribute('description') || 'No Description';
        const status = this.getAttribute('status') || 'pending';

        // Define el contenido HTML que se insertará en el Shadow DOM
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./src/components/TaskItem/TaskItem.css">
            <div class="task-container ${status === 'completed' ? 'completed' : ''}">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="toggle-status">
                    ${status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                </button>
            </div>
        `;
    }
}

// Define el custom element `<task-item>` basado en la clase `TaskItem`
customElements.define('task-item', TaskItem);
export default TaskItem;
