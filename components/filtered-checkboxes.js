import {LitElement, html, css, unsafeCSS} from 'lit-element';
import {globalStyles} from './global-styles';
import {chevronDown} from './svgs';
import {largeUp, xlargeUp} from './media-queries';

import './checkboxes-filter';

class FilteredCheckboxes extends LitElement {
  static get properties() {
    return {
      /**
       * Total number of items in the collection.
       * @type {string}
       */
      legend: {type: String},

      /**
       * Name of key to filter on.
       * @type {string}
       */
      keyname: {type: String},
      /**
       * Name used for filtering function.
       * @type {string}
       */
      filterBy: {type: String},

      /**
       * Options to filter on.
       * @type {object}
       */
      theSelect: {type: Object},

      /**
       * Currently filtered objects.
       * @type {object}
       */
      currentFiltered: {type: Object},

      /**
       * Is the filter open or closed.
       * @type {boolean}
       */
      isOpen: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.isOpen = false;
  }
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          display: block;
          width: 100%;
        }
        .toggle {
          max-height: var(--toggle-max-height, 0);
          overflow: hidden;
          transition: all 0.35s ease-in-out;
        }

        .btn {
          background: var(--color-davys-grey);
          border: 1px solid #000;
          border-radius: 0;
          color: #fff;
          display: flex;
          justify-content: space-between;
          padding: 20px;
          position: relative;
          text-align: left;
          transition: all 0.25s ease;
          width: 100%;
        }
        .btn::before {
          background: var(--filter-border);
          content: '';
          height: 100%;
          left: 0;
          opacity: 0;
          position: absolute;
          top: 0;
          transition: inherit;
          width: 10px;
        }

        .btn:hover,
        .btn:focus {
          background: #000;
        }
        .btn:hover::before,
        .btn:focus::before {
          opacity: 1;
        }
        .btn svg {
          fill: #fff;
          transition: all 0.25s ease;
          transition-delay: var(--btn-svg-delay, 0s);
          transform: var(--btn-svg-transform, rotate(0deg));
        }

        fieldset {
          border: none;
        }

        legend {
          color: var(--color-upsdell-red);
          padding-top: 20px;
          display: inline-block;
        }

        ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        ul li {
          flex: 0 1 50%;
        }
        @media ${unsafeCSS(largeUp)} {
          ul li {
            flex: 0 1 33%;
          }
        }

        @media ${unsafeCSS(xlargeUp)} {
          ul li {
            flex: 0 1 25%;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div>
        <button type="button" class="btn" @click=${this._toggleFilter}>
          <span>
            <span class="a11y">Open</span>
            ${this.legend}
            <span class="a11y">Filters</span>
          </span>
          <span aria-hidden="true"> ${chevronDown} </span>
        </button>
        <div class="toggle">
          <fieldset .disabled=${!this.isOpen}>
            <legend>${this.legend}</legend>
            <ul>
              ${this.theSelect.sort().map(
                (key) => html`
                  <li>
                    <checkboxes-filter
                      filterName=${key}
                      keyname=${this.keyname}
                      filterBy=${this.filterBy}
                      .currentFiltered=${this.currentFiltered}
                    ></checkboxes-filter>
                  </li>
                `
              )}
            </ul>
          </fieldset>
        </div>
      </div>
    `;
  }
  _toggleFilter = () => {
    this.isOpen = !this.isOpen;
    const maxHeight = this.isOpen ? '10000px' : 0;
    const btnTransform = this.isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    const btnSVGDelay = this.isOpen ? '0s' : '.35s';
    this.style.setProperty('--toggle-max-height', maxHeight);
    this.style.setProperty('--btn-svg-transform', btnTransform);
    this.style.setProperty('--btn-svg-delay', btnSVGDelay);
  };
}
window.customElements.define('filtered-checkboxes', FilteredCheckboxes);
