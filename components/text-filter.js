import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';

class TextFilter extends LitElement {
  static get properties() {
    return {
      /**
       * The is the collection loading.
       * @type {boolean}
       */
      stillLoading: {type: Boolean},
      /**
       * The is the collection loading.
       * @type {string}
       */
      textFilter: {type: String},
    };
  }
  static get styles() {
    return [
      globalStyles,
      css`
        span {
          display: block;
          font-size: 1rem;
          margin-bottom: 5px;
        }

        input {
          margin-bottom: 15px;
          margin-right: 20px;
          max-width: 100%;
        }
      `,
    ];
  }
  get filter() {
    return this.renderRoot?.querySelector('.filter') ?? null;
  }
  render() {
    return html`
      <label>
        <span> Type to narrow the collection </span>
        <input
          class="filter"
          type="text"
          .value=${this.textFilter}
          @keyup=${this._filterText}
          .disabled="${this.stillLoading}"
        />
      </label>
    `;
  }

  _filterText() {
    const options = {
      detail: {text: this.filter.value},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('filterText', options));
  }
}
window.customElements.define('text-filter', TextFilter);
