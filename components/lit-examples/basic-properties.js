import { LitElement, html } from "lit-element";

class BasicProperties extends LitElement {
    static properties = {
        name: {},
    };

    render() {
        return html`<p>Hello I'm ${this.name}.</p>`;
    }
}
customElements.define('basic-properties', BasicProperties);

const tag = document.createElement('basic-properties');
tag.name = 'dynamically created';
document.body.appendChild(tag);