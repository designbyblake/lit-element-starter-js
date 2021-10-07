import { LitElement, html, css } from "lit-element";
import '../components/lit-examples/simple-greeting'
import '../components/lit-examples/date-picker.js';
import '../components/lit-examples/full-component.js'
import '../components/lit-examples/basic-properties.js';
console.log('tst')
export class ExamplesPage extends LitElement {
    static get styles() {
        return css `
        .mars {
            --planet-color: red;
        }
        `;
    }

    
    render() {
       return html`
            <h1>Examples Page</h1>
            <simple-greeting name=" Example Page"></simple-greeting>
            <date-picker></date-picker>
            <full-component></full-component>
            <full-component planet="Mars" class="mars"></full-component>
            <basic-properties name="static, props driven"></basic-properties>
        `;
        
    }
}
window.customElements.define('examples-page', ExamplesPage);