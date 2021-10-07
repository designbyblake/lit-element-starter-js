import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
import {grid, list} from './svgs';

class CollectionSort extends LitElement {
  static properties = {
    display: {type: String},
    updateDisplay: {type: Function},
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
          data-display="list"
          type="button"
          class="btn-grid-list hide-small ${isList}"
        >
          <span aria-hidden="true">${list}</span>
          <span class="a11y">Display Display collection as a list</span>
        </button>
      </div>
    `;
  }

  _dispatchDisplay(e) {
    const displayType = e.target.dataset.display;
    const options = {
      detail: {displayType},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('setDisplay', options));
  }
}
window.customElements.define('collection-sort', CollectionSort);
