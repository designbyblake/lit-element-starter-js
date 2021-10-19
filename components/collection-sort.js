import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
import {grid, list, filter, sortDescending, sortAscending} from './svgs';
import {callDispatch} from '../utils/state';
class CollectionSort extends LitElement {
  static properties = {
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
     * The current value of the sort select.
     * @type {string}
     */
    sortedOn: {type: String},
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

        button {
          background-color: var(--button-bg);
          border-radius: 4px;
          border: 2px solid #fff;
          box-shadow: var(--box-shadow);
          color: #fff;
          height: 48px;
          padding: 0;
          position: relative;
          transition: all 0.25s ease;
          width: 48px;
        }
        button[disabled] {
          opacity: 0.3;
        }

        button span,
        button svg {
          pointer-events: none;
        }
        button:hover:not(.active) {
          background: var(--button-hover);
        }

        button.active {
          background-color: var(--color-white);
        }
        button.btn-wide {
          font-size: 1.325rem;
          height: 48px;
          padding-left: 5px;
          padding-right: 10px;
          width: auto;
        }

        button.btn-clear {
          padding: 10px;
        }

        button svg {
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

        button.btn-wide svg {
          position: relative;
          left: auto;
          top: auto;
          transform: none;
        }

        button.active svg {
          fill: var(--button-hover);
          filter: none;
          stroke: var(--button-hover);
        }

        select {
          background-color: var(--button-bg);
          border-radius: 4px;
          border: 2px solid #fff;
          box-shadow: var(--box-shadow);
          color: #fff;
          cursor: pointer;
          font-size: 1.325rem;
          height: 48px;
          margin-right: 10px;
          min-width: 150px;
          padding: 5px 25px 5px 10px;
          position: relative;
          text-align: left;
          text-shadow: 3px 2px 8px black;
          transition: all 0.25s ease;
        }
        select[disabled] {
          opacity: 0.3;
        }
        select:hover,
        select:focus {
          background-color: var(--button-hover);
        }
      `,
    ];
  }
  render() {
    const isGrid = this.display === 'grid' && 'active';
    const isList = this.display === 'list' && 'active';
    const isAscending = this.direction === 'ascending' && 'active';
    const isDescending = this.direction === 'descending' && 'active';
    const sortList = ['Artist', 'Album Name', 'Date Added'];
    return html`
      <div class="collection-sort">
        <button
          @click=${this._dispatchDisplay}
          data-display="grid"
          type="button"
          class="hide-small ${isGrid}"
        >
          <span aria-hidden="true">${grid}</span>
          <span class="a11y">Display collection as a grid</span>
        </button>
        <button
          @click=${this._dispatchDisplay}
          class="hide-small ${isList}"
          data-display="list"
          type="button"
        >
          <span aria-hidden="true">${list}</span>
          <span class="a11y">Display Display collection as a list</span>
        </button>

        <select @change=${this._dispatchSort} .disabled=${this.stillLoading}>
          ${sortList.map(
            (key) =>
              html`<option value="${key}" .selected=${this.sortedOn === key}>
                ${key}
              </option>`
          )}
        </select>

        <button
          @click=${this._dispatchDirection}
          class="hide-small ${isDescending}"
          data-direction="descending"
          type="button"
          .disabled=${this.stillLoading}
        >
          <span aria-hidden="true">${sortDescending}</span>
          <span class="a11y">Display collection in descending order</span>
        </button>

        <button
          @click=${this._dispatchDirection}
          class="hide-small ${isAscending}"
          data-direction="ascending"
          type="button"
          .disabled=${this.stillLoading}
        >
          <span aria-hidden="true">${sortAscending}</span>
          <span class="a11y">Display collection in ascending order</span>
        </button>

        <div class="wrap-small">
          <button
            .disabled=${this.stillLoading}
            @click=${this._dispatchFilter}
            class="btn-wide btn--outline btn--shadow"
            type="button"
          >
            <span class="btn__icon">${filter} </span>
            <span class="btn__text">Filters</span>
          </button>

          <button
            @click=${this._dispatchResetFilters}
            class="btn-wide btn-clear btn--outline btn--shadow"
            type="button"
          >
            <span class="btn__text">Clear Filters</span>
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

    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('triggerTrap', options));
  }

  _dispatchDirection(e) {
    const direction = e.target.dataset.direction;

    const action = {
      data: {direction},
      type: 'DIRECTION',
    };
    callDispatch(this, action);
  }

  _dispatchSort(e) {
    const action = {
      data: {sort: e.target.value},
      type: 'SORT_ORDER',
    };
    callDispatch(this, action);
  }

  _dispatchResetFilters() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('resetFilters', options));
  }
}
window.customElements.define('collection-sort', CollectionSort);
