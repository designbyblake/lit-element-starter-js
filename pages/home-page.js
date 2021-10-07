import { LitElement, html } from "lit-element";
import '../components/lit-examples/simple-greeting'
export class HomePage extends LitElement {
    render() {
        return html`
            <simple-greeting name="Home Page"></simple-greeting>
        `;
    }
}
window.customElements.define('home-page', HomePage);