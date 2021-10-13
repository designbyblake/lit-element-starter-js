import {LitElement, html} from 'lit-element';
import './active-filter';

class CollectionActiveFilters extends LitElement {
  static get properties() {
    return {
      /**
       * List of all filtered artists.
       * @type {object}
       */
      filteredArtists: {type: Object},

      /**
       * List of all filtered genres.
       * @type {object}
       */
      filteredGenres: {type: Object},

      /**
       * List of all filtered styles.
       * @type {object}
       */
      filteredStyles: {type: Object},

      /**
       * List of all filtered record labels.
       * @type {object}
       */
      filteredLabels: {type: Object},
    };
  }
  render() {
    return html`
      <active-filter
        .filtered=${this.filteredArtists}
        heading="Artists"
        keyname="filteredArtists"
      ></active-filter>
      <active-filter
        .filtered=${this.filteredGenres}
        heading="Genres"
        keyname="filteredGenres"
      ></active-filter>
      <active-filter
        .filtered=${this.filteredStyles}
        heading="Styles"
        keyname="filteredStyles"
      ></active-filter>
      <active-filter
        .filtered=${this.filteredLabels}
        heading="Record Labels"
        keyname="filteredLabels"
      ></active-filter>
    `;
  }
}
window.customElements.define(
  'collection-active-filters',
  CollectionActiveFilters
);
