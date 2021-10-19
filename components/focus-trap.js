import {LitElement, html, css} from 'lit-element';

class FocusTrap extends LitElement {
  static get styles() {
    return css`
      :host {
        background: red;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    `;
  }

  constructor() {
    super();

    this.handleFocus = this.handleFocus.bind(this);
    window.addEventListener('keydown', this.handleFocus);
  }

  handleFocus(e) {
    console.log(e);
    const test = this.shadowRoot.querySelector('#test');
    const test2 = test.querySelectorAll('div');
    console.log(test);
    console.log(test2);
  }
  render() {
    return html`
      <div id="focus-trap">
        <slot id="test"> </slot>
      </div>
    `;
  }
}

window.customElements.define('focus-trap', FocusTrap);
