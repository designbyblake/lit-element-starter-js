import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';

class CheckboxesFilter extends LitElement {
  static get properties() {
    return {
      /**
       * Are the inputs focusable.
       * @type {boolean}
       */
      disabled: {type: Boolean},
      /**
       * Display name of filter.
       * @type {string}
       */
      filterName: {type: String},

      /**
       * Name of key to filter on.
       * @type {string}
       */
      keyname: {type: String},
      /**
       * Currently filtered.
       * @type {array}
       */
      currentFiltered: {type: Array},

      /**
       * Name used for filtering function.
       * @type {string}
       */
      filterBy: {type: String},
    };
  }
  static get styles() {
    return [
      globalStyles,
      css`
        .checkbox {
          padding: 7px 0;
        }

        label {
          display: flex;
        }
        input {
          position: relative;
          top: 2px;
        }
        input:checked + span {
          font-weight: bold;
        }

        span {
          font-size: 1rem;
          padding-left: 10px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="checkbox">
        <label>
          <input
            type="checkbox"
            .checked=${this.currentFiltered.includes(this.filterName)}
            .disabled=${this.disabled}
            name=${this.filterName}
            @click=${this._filterCheckbox}
          />
          <span>${this.filterName}</span>
        </label>
      </div>
    `;
  }

  _filterCheckbox(e) {
    const filter = {
      name: e.target.name,
      checked: e.target.checked,
      keyname: this.keyname,
      filterBy: this.filterBy,
    };
    const options = {
      detail: {filter},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('filterCheckboxes', options));
  }
}
window.customElements.define('checkboxes-filter', CheckboxesFilter);
