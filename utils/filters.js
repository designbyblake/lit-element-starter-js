/* eslint-disable no-undef */
export function setFilters(state) {
  const {collectionDisplay, activeFilter, filtered, textFilter} = state;
  let artistSet = new Set();
  let genereSet = new Set();
  let styleSet = new Set();
  let labelSet = new Set();
  if (
    (activeFilter !== true || filtered === 'artists') &&
    textFilter.length === 0
  ) {
    artistSet = new Set([...state.artists]);
  } else if (
    (activeFilter !== true || filtered === 'genres') &&
    textFilter.length === 0
  ) {
    genereSet = new Set([...state.genres]);
  } else if (
    (activeFilter !== true || filtered === 'styles') &&
    textFilter.length === 0
  ) {
    styleSet = new Set([...state.styles]);
  } else if (
    (activeFilter !== true || filtered === 'record-label') &&
    textFilter.length === 0
  ) {
    labelSet = new Set([...state.labels]);
  }

  collectionDisplay.forEach((record) => {
    if (filtered !== 'artist') {
      artistSet.add(record.basic_information.artists[0].name);
    }

    if (filtered !== 'genres') {
      record.basic_information.genres.forEach((gen) => {
        genereSet.add(gen);
      });
    }

    if (filtered !== 'styles') {
      record.basic_information.styles.forEach((style) => {
        styleSet.add(style);
      });
    }

    if (filtered !== 'record-label') {
      record.basic_information.labels.forEach((label) => {
        labelSet.add(label.name);
      });
    }
  });

  return {
    ...state,
    filterd: false,
    activeFilter: false,
    artists: [...artistSet],
    genres: [...genereSet],
    styles: [...styleSet],
    labels: [...labelSet],
  };
}

export function filterCollection(state) {
  const {
    collection,
    filteredArtists,
    filteredGenres,
    filteredStyles,
    filteredLabels,
    textFilter,
  } = state;

  let filteredArtistsArray = [];
  let filteredGenreArray = [];
  let filteredStylesArray = [];
  let collectionArray = [];
  let displayArray = [];

  if (textFilter.length > 0) {
    collection.forEach((album) => {
      if (
        album.basic_information.artists[0].name
          .toLowerCase()
          .includes(textFilter.toLowerCase()) ||
        album.basic_information.title
          .toLowerCase()
          .includes(textFilter.toLowerCase())
      ) {
        displayArray.push(album);
      }
    });
  } else {
    displayArray = collection;
  }

  if (filteredArtists.length > 0) {
    displayArray.forEach((album) => {
      if (filteredArtists.includes(album.basic_information.artists[0].name)) {
        filteredArtistsArray.push(album);
      }
    });
  } else {
    filteredArtistsArray = displayArray;
  }

  if (filteredGenres.length > 0) {
    filteredArtistsArray.forEach((album) => {
      album.basic_information.genres.forEach((genre) => {
        if (filteredGenres.includes(genre)) {
          filteredGenreArray.push(album);
        }
      });
    });
  } else {
    filteredGenreArray = filteredArtistsArray;
  }

  if (filteredStyles.length > 0) {
    filteredGenreArray.forEach((album) => {
      album.basic_information.styles.forEach((style) => {
        if (filteredStyles.includes(style)) {
          filteredStylesArray.push(album);
        }
      });
    });
  } else {
    filteredStylesArray = filteredGenreArray;
  }

  if (filteredLabels.length > 0) {
    filteredStylesArray.forEach((album) => {
      album.basic_information.labels.forEach((label) => {
        if (filteredLabels.includes(label.name)) {
          collectionArray.push(album);
        }
      });
    });
  } else {
    collectionArray = filteredStylesArray;
  }

  const collectionSet = new Set(collectionArray);

  return {
    ...state,
    collectionDisplay: [...collectionSet],
    updateCollectionDisplay: false,
  };
}

export function sortFilters(a, b) {
  const nameA = a.basic_information.artists[0].name.toLowerCase();
  const nameB = b.basic_information.artists[0].name.toLowerCase();
  const titleA = a.basic_information.title.toLowerCase();
  const titleB = b.basic_information.title.toLowerCase();
  return nameA > nameB ? 1 : nameA === nameB ? (titleA > titleB ? 1 : -1) : -1;
}

Array.prototype.sortByName = function () {
  return this.sort((a, b) =>
    a.basic_information.title.toLowerCase() >
    b.basic_information.title.toLowerCase()
      ? 1
      : -1
  );
};

Array.prototype.sortByArtist = function () {
  return this.sort((a, b) => sortFilters(a, b));
};

Array.prototype.sortByDate = function () {
  return this.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
};

export function doTheSortOrder(state, action) {
  console.log(action.data.sort);
  let theCollection = [...state.collection];
  let sortCollectionDisplay = [...state.collectionDisplay];

  if (action.data.sort === 'Artist') {
    theCollection.sortByArtist();
    sortCollectionDisplay.sortByArtist();
  } else if (action.data.sort === 'Album Name') {
    theCollection.sortByName();
    sortCollectionDisplay.sortByName();
  } else if (action.data.sort === 'Date Added') {
    theCollection.sortByDate();
    sortCollectionDisplay.sortByDate();
  }
  console.log(state.direction);
  if (state.direction === 'ascending') {
    theCollection.reverse();
    sortCollectionDisplay.reverse();
  }
  return {
    ...state,
    collection: [...theCollection],
    collectionDisplay: [...sortCollectionDisplay],
  };
}

export function doTheDirection(state, action) {
  if (state.direction === action.data.direction) {
    return {
      ...state,
    };
  }

  return {
    ...state,
    direction: action.data.direction,
    collection: [...state.collection].reverse(),
    collectionDisplay: [...state.collectionDisplay].reverse(),
  };
}

export function sortCollection(state) {
  const collection = [...state.collection];

  let newCollection = [];
  let currentArtist = '';
  let currentArtistArray = [];
  collection.forEach((record) => {
    if (currentArtist !== record.basic_information.artists[0].name) {
      currentArtist = record.basic_information.artists[0].name;
      const sort = currentArtistArray.sort((a, b) =>
        a.basic_information.year > b.basic_information.year ? 1 : -1
      );

      newCollection = [...newCollection, ...sort];

      currentArtistArray = [];
    }
    currentArtistArray.push(record);
  });

  return {
    ...state,
    collectionDisplay: [...newCollection],
  };
}
