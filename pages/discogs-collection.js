import {LitElement, html, css} from 'lit-element';
import {globalStyles} from '../components/global-styles';
import '../components/album-info-modal';
import '../components/background-image';
import '../components/collection-active-filters';
import '../components/collection-filters';
import '../components/collection-footer';
import '../components/collection-header';
import '../components/collection-sort';
import '../components/discogs-list';
import '../components/discogs-listing';

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
    const {
      artists,
      collection,
      collectionDisplay,
      collectionTotal,
      currentAlbum,
      currentAlbumShow,
      direction,
      display,
      filteredArtists,
      filteredGenres,
      filteredLabels,
      filteredStyles,
      genres,
      labels,
      showFilters,
      sortedOn,
      stillLoading,
      styles,
      textFilter,
    } = this.state;

    let filters = html` <collection-filters
      .artists=${artists}
      .collectionDisplayLength=${collectionDisplay.length}
      .collectionTotal=${collectionTotal}
      .filteredArtists=${filteredArtists}
      .filteredGenres=${filteredGenres}
      .filteredLabels=${filteredLabels}
      .filteredStyles=${filteredStyles}
      .genres=${genres}
      .labels=${labels}
      .showFilters=${showFilters}
      .stillLoading=${stillLoading}
      .styles=${styles}
      .textFilter=${textFilter}
      @dispatch=${this._dispatch}
      @filterCheckboxes=${this._filterCheckboxes}
      @filterText=${this._filterText}
    ></collection-filters>`;

    let albuminfo = html`<album-info-modal
      .currentAlbum=${currentAlbum}
      @dispatch=${this._dispatch}
    ></album-info-modal>`;
    return html`
      <background-image></background-image>
      <div class="container">
        <collection-header
          .collectionDisplayLength=${collectionDisplay.length}
          .collectionLength=${collection.length}
          .collectionTotal=${collectionTotal}
          .stillLoading=${stillLoading}
          .userName=${this.discogsUser}
        ></collection-header>
        <collection-sort
          .direction=${direction}
          .display=${display}
          .stillLoading=${stillLoading}
          .sortedOn=${sortedOn}
          @triggerTrap=${this._trapFocus}
          @resetFilters=${this._resetFilters}
          @dispatch=${this._dispatch}
        ></collection-sort>
        <collection-active-filters
          .filteredArtists=${filteredArtists}
          .filteredGenres=${filteredGenres}
          .filteredLabels=${filteredLabels}
          .filteredStyles=${filteredStyles}
          @filterCheckboxes=${this._filterCheckboxes}
          @dispatch=${this._dispatch}
        ></collection-active-filters>
        <div class="collection" @dispatch=${this._dispatch}>
          ${display === 'grid'
            ? collectionDisplay.map((item) => {
                const basicInformation = item.basic_information;
                return html`<discogs-listing
                  .basicInformation="${basicInformation}"
                  display="${display}"
                ></discogs-listing>`;
              })
            : html`<discogs-list
                .collectionDisplay=${collectionDisplay}
                .display=${display}
              ></discogs-list>`}
        </div>
      </div>

      <collection-footer
        .direction=${direction}
        .display=${display}
        .sortedOn=${sortedOn}
        .stillLoading=${stillLoading}
        .textFilter=${textFilter}
        @filterText=${this._filterText}
        @resetFilters=${this._resetFilters}
        @dispatch=${this._dispatch}
        @triggerTrap=${this._trapFocus}
      ></collection-footer>

      ${showFilters ? filters : null} ${currentAlbumShow ? albuminfo : null}
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
    let newState = {
      ...state,
      [filter.keyname]: currentlyChecked,
      filtered: filter.filterBy,
      activeFilter: true,
    };
    newState = dispatch(newState, {type: 'FILTER_COLLECTION', filter});
    this.state = dispatch(newState, {type: 'SET_FILTERS'});
  }

  _filterText(e) {
    let newState = {...this.state, textFilter: e.detail.text};
    this._doFilters(newState);
  }
  _resetFilters() {
    let newState = dispatch(this.state, {type: 'RESET_FILTERS'});
    this._doFilters(newState);
  }

  _doFilters(newState) {
    newState = dispatch(newState, {type: 'FILTER_COLLECTION'});
    this.state = dispatch(newState, {type: 'SET_FILTERS'});
  }
  _trapFocus() {
    // let trap = this.shadowRoot.querySelector('#trap');
    // let focusable = this.shadowRoot.querySelector('collection-header');
  }
  _dispatch(e) {
    this.state = dispatch(this.state, e.detail);
  }
}
window.customElements.define('discogs-collection', DiscogsCollection);
