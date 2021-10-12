export function loadData(state, data) {
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
  return newState;
}
