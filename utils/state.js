export const initialState = {
  activeFilter: false,
  artists: [],
  currentAlbum: {},
  currentAlbumShow: false,
  collection: [],
  collectionDisplay: [],
  collectionIsLoading: true,
  display: 'grid',
  direction: 'descending',
  fetchURL: '',
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
  sortedOn: 'Artist',
  showFilters: false,
  stillLoading: true,
  userName: null,
};

export function callDispatch(self, detail, bubbles = true, composed = true) {
  const options = {
    detail,
    bubbles,
    composed,
  };
  self.dispatchEvent(new CustomEvent('dispatch', options));
}
