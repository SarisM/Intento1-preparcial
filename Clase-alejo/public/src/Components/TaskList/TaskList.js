import { TaskList } from "../../../../../pre-parcial/public/src/components";

class AppContainer extends HTMLElement {
    //lo que debe tener el html para que funcione

    constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

    render ()
    {
        this.shadowRoot.innerHTML = `
        <h1>Abuelo</h1>
        `
    }
}

export default TaskList; 
customElements.define