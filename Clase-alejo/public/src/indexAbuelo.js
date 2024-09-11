import * components from './Components/indexPdre.js'
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
