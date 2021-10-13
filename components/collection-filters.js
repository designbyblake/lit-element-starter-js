import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
import {close} from './svgs';
import './filtered-checkboxes';
import './text-filter';
import {callDispatch} from '../utils/state';
class CollectionFilters extends LitElement {
  static get properties() {
    return {
      /**
       * Total number of items in the collection.
       * @type {number}
       */
      collectionTotal: {type: Number},

      /**
       * Total number of collection items showing after filtering
       * @type {number}
       */
      collectionDisplayLength: {type: Number},
      /**
       * Should we show the filters.
       * @type {boolean}
       */
      showFilters: {type: Boolean},

      /**
       * List of all artists.
       * @type {object}
       */
      artists: {type: Object},

      /**
       * List of all filtered artists.
       * @type {object}
       */
      filteredArtists: {type: Object},
      /**
       * List of all genres.
       * @type {object}
       */
      genres: {type: Object},

      /**
       * List of all filtered genres.
       * @type {object}
       */
      filteredGenres: {type: Object},
      /**
       * List of all styles.
       * @type {object}
       */
      styles: {type: Object},

      /**
       * List of all filtered styles.
       * @type {object}
       */
      filteredStyles: {type: Object},
      /**
       * List of all record labels.
       * @type {object}
       */
      labels: {type: Object},

      /**
       * List of all filtered record labels.
       * @type {object}
       */
      filteredLabels: {type: Object},

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
        .bg {
          background: rgba(0, 0, 0, 0.75);
          display: none;
          height: 100%;
          left: 0;
          opacity: var(--filter-opacity, 0);
          position: fixed;
          top: 0;
          transition: all 0.25s ease;
          width: 100%;
        }
        .bg.showing {
          display: block;
        }

        .collection-filters {
          background: rgba(255, 255, 255, 0.97);
          box-shadow: var(--box-shadow);
          display: none;
          height: 100vh;
          left: var(--collection-filters-left, -100%);
          max-width: 100vw;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 20px 0;
          position: fixed;
          top: 0;
          transition: all 0.25s ease;
          width: 100%;
          z-index: 101;
        }
        .collection-filters:focus {
          outline: none;
        }

        .collection-filters.showing {
          display: block;
        }

        .close {
          background: none;
          border: none;
          position: absolute;
          right: 5px;
          transition: all 0.25s ease;
        }

        .close:hover,
        .close:focus {
          svg {
            fill: var(--color-upsdell-red);
          }
        }
        .close svg {
          height: 32px;
          width: 32px;
        }

        form {
          overflow: hidden;
          width: 100%;
        }
        fieldset {
          border: none;
          padding: 0;
          margin: 0;
        }
        legend {
          color: var(--color-upsdell-red);
          display: inline-block;
          font-weight: bold;
          padding: 0 18px;
        }

        .buttons {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          padding: 0 0 20px 18px;
          width: calc(100% - 18px);
        }
        .buttons p {
          flex: 0 1 100%;
          font-size: 1rem;
          margin: 10px 0;
        }

        .buttons .btn {
          position: relative;
          top: 3px;
        }

        @media (min-width: 768px) {
          .collection-filters {
            max-width: 90vw;
          }

          .buttons p {
            font-size: 1.125rem;
          }
        }
      `,
    ];
  }

  updated(changedProperties) {
    if (this.showFilters === true) {
      setTimeout(() => {
        this.style.setProperty('--filter-opacity', 1);
      }, 10);

      setTimeout(() => {
        this.style.setProperty('--collection-filters-left', 0);
      }, 250);
    }
    return changedProperties.has('showFilters');
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._keypress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._keypress);
  }

  render() {
    return html`
      <div class="bg ${this.showFilters && `showing`}"></div>
      <div
        class="collection-filters ${this.showFilters && `showing`}"
        id="collection-filters"
        tabindex="-1"
      >
        <button class="close" type="button" @click=${this._close}>
          <span class="a11y">Close Filters</span>
          <span aria-hidden="true">${close} </span>
        </button>

        <form>
          <fieldset>
            <legend>Filter the collection</legend>
            <div class="buttons">
              <p>
                Showing ${this.collectionDisplayLength} of
                ${this.collectionTotal} items
              </p>
              <text-filter
                .stillLoading=${this.stillLoading}
                .textFilter=${this.textFilter}
              ></text-filter>
              <filtered-checkboxes
                legend="Artists"
                filterBy="artists"
                keyname="filteredArtists"
                .theSelect=${this.artists}
                .currentFiltered=${this.filteredArtists}
              ></filtered-checkboxes>

              <filtered-checkboxes
                legend="Genres"
                keyname="filteredGenres"
                filterBy="genres"
                .theSelect=${this.genres}
                .currentFiltered=${this.filteredGenres}
              ></filtered-checkboxes>

              <filtered-checkboxes
                legend="Styles"
                keyname="filteredStyles"
                filterBy="styles"
                .theSelect=${this.styles}
                .currentFiltered=${this.filteredStyles}
              ></filtered-checkboxes>

              <filtered-checkboxes
                legend="Record Labels"
                keyname="filteredLabels"
                filterBy="record-label"
                .theSelect=${this.labels}
                .currentFiltered=${this.filteredLabels}
              ></filtered-checkboxes>
            </div>
          </fieldset>
        </form>
      </div>
    `;
  }
  _close = () => {
    this.style.setProperty('--collection-filters-left', '-100%');
    setTimeout(() => {
      this.style.setProperty('--filter-opacity', 0);
    }, 250);
    setTimeout(() => {
      const action = {
        data: {showFilter: false},
        type: 'TOGGLE_FILTERS',
      };
      callDispatch(this, action);
    }, 500);
  };
  _keypress = (e) => {
    if (e.keyCode === 27) {
      this._close();
    }
  };
}
window.customElements.define('collection-filters', CollectionFilters);
