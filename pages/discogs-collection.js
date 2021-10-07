import {LitElement, html, css} from 'lit-element';
import {globalStyles} from '../components/global-styles';
import '../components/background-image';
import '../components/discogs-listing';
import '../components/collection-header';
import '../components/collection-sort';
import '../components/discogs-list';

const api = {
  token: 'FTZuqJVmCyDzXGVakILvGhZhnRTAporVIAlnNHqL',
  username: 'designbyblake',
  noAuth: '&key=XrkJNIPwCiPgddPIWUbM&secret=XDLuYdixEQmQqBFGeZKdeeGDgbxFWtJT',
  perPage: 50,
  sort: 'artist',
  order: 'asc',
  key: 'XrkJNIPwCiPgddPIWUbM',
  secret: 'XDLuYdixEQmQqBFGeZKdeeGDgbxFWtJT',
};

export class DiscogsCollection extends LitElement {
  static properties = {
    discogsUser: {type: String},
    collection: {type: Object},
    fetchURL: {type: String},
    state: {type: Object},
  };

  constructor() {
    super();

    this.state = {
      activeFilter: false,
      artists: [],
      currentAlbum: {},
      currentAlbumShow: false,
      collection: [],
      collectionDisplay: [],
      collectionIsLoading: true,
      collectionTotal: 0,
      display: 'grid',
      direction: 'descending',
      fetchURL: '',
      filtered: null,
      filteredArtists: [],
      filteredGenres: [],
      filteredStyles: [],
      filteredLabel: [],
      error: null,
      genres: [],
      labels: [],
      styles: [],
      textFilter: '',
      loaded: false,
      updateCollectionDisplay: true,
      scrollPosition: 0,
      showFilters: false,
      stillLoading: true,
      userName: '',
    };
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
          collectionDisplayLength=${this.state.collectionDisplay.length}
          collectionLength=${this.state.collection.length}
          collectionTotal=${this.state.collectionTotal}
          stillLoading=${this.state.stillLoading}
          userName=${this.discogsUser}
        ></collection-header>
        <collection-sort
          .display=${this.state.display}
          @setDisplay=${this._updateDisplay}
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
                display=${this.state.display}
              ></discogs-list>`}
        </div>
      </div>
    `;
  }

  _getDiscogsData() {
    if (this.state.fetchURL !== '') {
      fetch(this.state.fetchURL)
        .then((res) => res.json())
        .then((data) => {
          this._loadData(this.state, data);
        })
        .catch((e) => {
          console.warn(e.message);
        });
    }
  }

  _loadData(state, data) {
    const collection = [];
    const collectionDisplay = [];

    const users = state.fetchURL.split('users/');
    const user = users[1].split('/');

    if (user[0] !== state.userName) {
      return {
        ...state,
      };
    }
    if (data.message) {
      return {
        ...state,
        error: data.message,
        loaded: true,
      };
    }
    data.releases.forEach((releaseSet) => {
      collection.push(releaseSet);
      collectionDisplay.push(releaseSet);
    });

    let newState = {
      ...state,
      loaded: true,
      collection: [...state.collection, ...collection],
      collectionTotal: data.pagination.items,
    };

    if (state.updateCollectionDisplay === true) {
      newState = {
        ...newState,
        loaded: true,
        collectionDisplay: [...state.collectionDisplay, ...collectionDisplay],
      };
    }

    if (data.pagination.urls.next) {
      newState = {
        ...newState,
        loaded: true,
        fetchURL: data.pagination.urls.next,
        collectionIsLoading: true,
        collectionTotal: data.pagination.items,
        stillLoading: true,
      };
    } else {
      newState = {
        ...newState,
        loaded: true,
        collectionIsLoading: false,
        collectionTotal: data.pagination.items,
        stillLoading: false,
      };
    }

    this.state = {...newState};
    if (data.pagination.page !== data.pagination.pages) {
      this._getDiscogsData();
    } else {
      console.log(this.state);
    }
  }

  _updateDisplay(e) {
    console.log('update Display');

    const display = e.detail.displayType;
    console.log(display);
    let newState = {...this.state, display: display};
    this.state = newState;
  }
}
window.customElements.define('discogs-collection', DiscogsCollection);
