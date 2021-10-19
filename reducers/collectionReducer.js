/* eslint-disable no-nested-ternary */
import {api} from '../utils/api';
import {loadData} from '../utils/data';
import {
  setFilters,
  filterCollection,
  doTheDirection,
  doTheSortOrder,
} from '../utils/filters';

export function dispatch(state, action) {
  switch (action.type) {
    case 'LOADED':
      return loadData(state, action.data);
    case 'SET_FILTERS':
      return setFilters(state);
    case 'FILTER_COLLECTION':
      return filterCollection(state);
    // case 'SET_FILTERED_ARRAYS':
    //   action.filterCollection();
    //   return {
    //     ...state,
    //     activeFilter: action.activeFilter,
    //     filtered: action.filtered,
    //     [action.stateName]: action.value,
    //   };
    case 'RESET_FILTERS':
      return {
        ...state,
        filteredArtists: [],
        filteredGenres: [],
        filteredStyles: [],
        filteredLabels: [],
        textFilter: '',
      };
    // case 'REMOVE_FILTER':
    //   action.filterCollection();
    //   return {
    //     ...state,
    //     [action.stateKey]: action.updatedState,
    //   };
    case 'ERROR':
      return {
        ...state,
        error: true,
      };
    case 'TOGGLE_FILTERS':
      return {
        ...state,
        showFilters: action.data.showFilter,
      };
    // case 'CLOSE_FILTERS':
    //   returnFocus(action.returnFocus);

    //   return {
    //     ...state,
    //     showFilters: false,
    //   };
    case 'GET_CURRENT_ALBUM':
      return {
        ...state,
        currentAlbum: action.data.album,
        currentAlbumShow: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        currentAlbumShow: false,
      };
    case 'TEXT_FILTER':
      return {
        ...state,
        textFilter: action.data.text,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        artists: [],
        currentAlbum: {},
        collection: [],
        collectionDisplay: [],
        collectionIsLoading: true,
        collectionTotal: '',
        filtered: null,
        filteredArtists: [],
        filteredGenres: [],
        filteredStyles: [],
        filteredLabels: [],
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
        fetchURL: window.encodeURI(
          `https://api.discogs.com/users/${action.userName}/collection/folders/0/releases?sort=${api.sort}&sort_order=${api.order}&per_page=${api.perPage}&token=${api.token}`
        ),
        userName: action.userName,
      };
    case 'SET_DISPLAY':
      return {
        ...state,
        display: action.data.display,
      };
    // case 'DISPATCH':
    //   return {
    //     ...state,
    //     dispatch: action.dispatch,
    //   };

    case 'SORT_ORDER':
      return doTheSortOrder(state, action);
    case 'DIRECTION':
      return doTheDirection(state, action);
    case 'SET_SCROLL':
      return {
        ...state,
        scrollPosition: action.scrollPosition,
      };
    default:
      throw new Error(`That action type isn't supported.`);
  }
}
