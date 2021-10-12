import {LitElement, html, css} from 'lit-element';
import {globalStyles} from '../components/global-styles';
import '../components/background-image';
import '../components/discogs-listing';
import '../components/collection-header';
import '../components/collection-sort';
import '../components/discogs-list';
import '../components/collection-filters';

import {api} from '../utils/api';
import {initialState} from '../utils/state';
import {dispatch} from '../reducers/collectionReducer';
export class DiscogsCollection extends LitElement {
  static get properties() {
    return {
      discogsUser: {type: String},
      state: {type: Object},
    };
  }

  constructor() {
    super();
    this.state = initialState;
  }

  connectedCallback() {
    super.connectedCallback();
    this.state = {
      ...this.state,
      userName: this.discogsUser,
      fetchURL: window.encodeURI(
        `https://api.discogs.com/users/${this.discogsUser}/collection/folders/0/releases?sort=${api.sort}&sort_order=${api.order}&per_page=${api.perPage}&token=${api.token}`
      ),
    };
    this._getDiscogsData();
  }
  _getDiscogsData() {
    fetch(this.state.fetchURL)
      .then((res) => res.json())
      .then((data) => {
        this.state = dispatch(this.state, {type: 'LOADED', data});
        if (data.pagination.page !== data.pagination.pages) {
          this._getDiscogsData();
        } else {
          this.state = dispatch(this.state, {type: 'SET_FILTERS'});
        }
      })
      .catch((e) => {
        console.warn(e.message);
      });
  }
  static get styles() {
    return [
      globalStyles,
      css`
        .collection {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          grid-gap: 20px;
          margin: auto;
          max-width: 1160px;
        }

        .container {
          max-width: 1200px;
          margin: auto;
          padding: 0 20px;
        }

        @media (min-width: 900px) {
          .container {
            padding-bottom: 125px;
          }
        }
      `,
    ];
  }
  render() {
    return html`
      <background-image></background-image>
      <div class="container">
        <collection-header
          .collectionDisplayLength=${this.state.collectionDisplay.length}
          .collectionLength=${this.state.collection.length}
          .collectionTotal=${this.state.collectionTotal}
          .stillLoading=${this.state.stillLoading}
          .userName=${this.discogsUser}
        ></collection-header>
        <collection-sort
          .display=${this.state.display}
          .stillLoading=${this.state.stillLoading}
          @dispatch=${this._dispatch}
        ></collection-sort>
        <div class="collection">
          ${this.state.display === 'grid'
            ? this.state.collectionDisplay.map((item) => {
                const basicInformation = item.basic_information;
                return html`<discogs-listing
                  .basicInformation="${basicInformation}"
                  display="${this.state.display}"
                ></discogs-listing>`;
              })
            : html`<discogs-list
                .collectionDisplay=${this.state.collectionDisplay}
                .display=${this.state.display}
              ></discogs-list>`}
        </div>
      </div>
      <collection-filters
        .showFilters=${this.state.showFilters}
        .collectionDisplayLength=${this.state.collectionDisplay.length}
        .collectionTotal=${this.state.collectionTotal}
        .artists=${this.state.artists}
        .filteredArtists=${this.state.filteredArtists}
        .genres=${this.state.genres}
        .filteredGenres=${this.state.filteredGenres}
        .styles=${this.state.styles}
        .filteredStyles=${this.state.filteredStyles}
        .labels=${this.state.labels}
        .filteredLabels=${this.state.filteredLabels}
        @filterCheckboxes=${this._filterCheckboxes}
        @dispatch=${this._dispatch}
      ></collection-filters>
    `;
  }

  _filterCheckboxes(e) {
    const state = {...this.state};
    let filter = e.detail.filter;
    let currentlyChecked = [...state[filter.keyname]];
    if (filter.checked === true) {
      currentlyChecked.push(filter.name);
    } else {
      currentlyChecked = currentlyChecked.filter(
        (item) => item !== filter.name
      );
    }
    let newState = {...state, [filter.keyname]: currentlyChecked};

    newState = dispatch(newState, {type: 'FILTER_COLLECTION'});
    this.state = dispatch(newState, {type: 'SET_FILTERS'});
  }
  _dispatch(e) {
    // console.log(e);
    this.state = dispatch(this.state, e.detail);
  }
}
window.customElements.define('discogs-collection', DiscogsCollection);
