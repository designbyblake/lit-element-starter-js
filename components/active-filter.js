import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
import {close} from './svgs';
import {callDispatch} from '../utils/state';
class ActiveFilter extends LitElement {
  static properties = {
    /**
     * List of active filters.
     * @type {array}
     */
    filtered: {type: Array},
    /**
     * The is the collection loading.
     * @type {string}
     */
    heading: {type: String},
    /**
     * The is the collection loading.
     * @type {string}
     */
    keyname: {type: String},
  };
  static get styles() {
    return [
      globalStyles,
      css`
        h2 {
          font-size: 1.5rem;
          margin-bottom: 0;
        }

        span {
          pointer-events: none;
        }

        button {
          --button-hover: #fff;
          --button-color: #000;
          background: var(--button-hover);
          border: none;
          border-radius: 10px;
          box-shadow: var(--box-shadow);
          color: var(--button-color);
          font-size: 1rem;
          margin: 0 10px 10px 0;
          padding: 9px 17px;
          transition: all 0.25s ease;
        }

        [aria-hidden='true'] {
          display: inline-block;
          width: 15px;
        }

        [aria-hidden='true'] svg {
          fill: var(--button-svg-fill, #000);
          height: auto;
          position: relative;
          top: 2px;
          transition: all 0.25s ease;
          width: 100%;
        }

        button:hover,
        button:focus {
          --button-hover: #000;
          --button-color: #ffffff;
          --button-svg-fill: #fff;
        }
      `,
    ];
  }
  render() {
    if (this.filtered.length > 0) {
      return html`
        <h2 class="shadow">${this.heading}</h2>
        ${this.filtered.sort().map(
          (name) => html` <button
            type="button"
            data-name=${name}
            @click=${() => {
              this._filterCheckbox(name);
            }}
          >
            <span aria-hidden="true"> ${close} </span>
            <span class="a11y">Remove </span> ${name}
          </button>`
        )}
      `;
    }
  }
  _filterCheckbox(name) {
    const filter = {
      name: name,
      checked: false,
      keyname: this.keyname,
    };
    const options = {
      detail: {filter},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('filterCheckboxes', options));
  }
}
window.customElements.define('active-filter', ActiveFilter);
