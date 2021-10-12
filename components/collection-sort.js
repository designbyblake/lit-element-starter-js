import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
import {grid, list, filter} from './svgs';
import {callDispatch} from '../utils/state';
class CollectionSort extends LitElement {
  static properties = {
    /**
     * The display type, grid or list.
     * @type {string}
     */
    display: {type: String},
    /**
     * The is the collection loading.
     * @type {boolean}
     */
    stillLoading: {type: Boolean},
  };
  static get styles() {
    return [
      globalStyles,
      css`
        .collection-sort {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
          margin-bottom: 30px;
        }

        .btn-grid-list {
          background-color: var(--button-bg);
          border-radius: 4px;
          border: 2px solid #fff;
          box-shadow: var(--box-shadow);
          color: #fff;
          height: 48px;
          padding: 0;
          position: relative;
          transition: background-color 0.25s ease;
          width: 48px;
        }

        .btn-grid-list:hover:not(.btn-grid-list--active) {
          background: var(--button-hover);
        }

        .btn-grid-list--active {
          background-color: var(--color-white);
        }

        .btn-grid-list svg {
          fill: #fff;
          filter: drop-shadow(var(--box-shadow));
          height: 21px;
          left: 50%;
          pointer-events: none;
          position: absolute;
          stroke: #fff;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: inherit;
          width: 24px;
        }

        .btn-grid-list--active svg {
          fill: var(--button-hover);
          filter: none;
          stroke: var(--button-hover);
        }
      `,
    ];
  }
  render() {
    const isGrid = this.display === 'grid' && 'btn-grid-list--active';
    const isList = this.display === 'list' && 'btn-grid-list--active';
    return html`
      <div class="collection-sort">
        <button
          @click="${this._dispatchDisplay}"
          data-display="grid"
          type="button"
          class="btn-grid-list hide-small ${isGrid}"
        >
          <span aria-hidden="true">${grid}</span>
          <span class="a11y">Display collection as a grid</span>
        </button>
        <button
          @click="${this._dispatchDisplay}"
          class="btn-grid-list hide-small ${isList}"
          data-display="list"
          type="button"
        >
          <span aria-hidden="true">${list}</span>
          <span class="a11y">Display Display collection as a list</span>
        </button>

        <div class="wrap-small">
          <button
            .disabled=${this.stillLoading}
            @click="${this._dispatchFilter}"
            class="btn btn--outline btn--shadow"
            type="button"
          >
            <span class="btn__icon">${filter} </span>
            <span class="btn__text">Filters</span>
          </button>
        </div>
      </div>
    `;
  }

  _dispatchDisplay(e) {
    const display = e.target.dataset.display;
    const action = {
      data: {
        display,
      },
      type: 'SET_DISPLAY',
    };
    callDispatch(this, action);
  }
  _dispatchFilter() {
    const action = {
      data: {showFilter: true},
      type: 'TOGGLE_FILTERS',
    };
    callDispatch(this, action);
  }
}
window.customElements.define('collection-sort', CollectionSort);
