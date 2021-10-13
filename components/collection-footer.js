import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
import './collection-sort';
import './text-filter';

class CollectionFooter extends LitElement {
  static get properties() {
    return {
      /**
       * The display type, grid or list.
       * @type {string}
       */
      display: {type: String},
      /**
       * The direction for sorting.
       * @type {string}
       */
      direction: {type: String},
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
        footer {
          background: var(--collection-footer);
          bottom: 0;
          box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.5);
          color: #fff;
          display: none;
          padding: 20px 0;
          position: fixed;
          width: 100%;
          z-index: 10;
        }

        collection-sort {
          margin-bottom: -35px;
        }

        .container {
          align-items: center;
          display: flex;
        }

        .btn--clear {
          display: none;
        }

        .collectionSort {
          margin-bottom: 0;
          top: 10px;
        }

        ul[role='listbox'] {
          bottom: 18px;
          top: auto;
        }

        @media (min-width: 1024px) {
          footer {
            display: block;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <footer>
        <div class="container collection-footer__container">
          <text-filter
            .stillLoading=${this.stillLoading}
            .textFilter=${this.textFilter}
          ></text-filter>
          <collection-sort
            .direction=${this.direction}
            .display=${this.display}
            .stillLoading=${this.stillLoading}
          ></collection-sort>
        </div>
      </footer>
    `;
  }
}

window.customElements.define('collection-footer', CollectionFooter);
