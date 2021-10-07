import { LitElement, html, css } from "lit-element";

export class FullComponent extends LitElement {
    static properties = {
        greeting: {},
        planet: {},
    }; 

    static styles = css`
        :host {
            display:inline-block;
            padding:10px;
            background: lightgray;
            margin:10px 0;
        }

        button{
            background:none;
            border:none;
            cursor: pointer
        }

        .planet {
            color: var(--planet-color, blue);
        }
    `;

    constructor() {
        super();
        // Define reactive properties--updating a reactive property causes
        // the component to update.
        this.greeting = 'Hello';
        this.planet = 'World';
    }

    render() {
        return html`
            <button @click=${this.togglePlanet} type="button">
                ${this.greeting}
                <span class="planet">${this.planet}</span>
            </button>
        `;
    }

    togglePlanet() {
        console.log('test');
        console.log(this.planet);
        this.planet = this.planet === 'World' ? 'Mars': 'World';
    }
}
customElements.define('full-component', FullComponent);