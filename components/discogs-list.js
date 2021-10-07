import {LitElement, html, css, unsafeCSS} from 'lit-element';
import {globalStyles} from './global-styles';
import {tabletUp} from './media-queries';
import './discogs-listing';
class DiscogsList extends LitElement {
  static properties = {
    collectionDisplay: {type: Object},
    display: {type: String},
  };

  static get styles() {
    return [
      globalStyles,
      css`
        h2 {
          font-size: 1.375rem;
          margin-top: 50px;
        }

        @media ${unsafeCSS(tabletUp)} {
          h2 {
            font-size: 2.25rem;
          }
        }
      `,
    ];
  }

  render() {
    let currentArtist = '';
    let showArtistName = '';
    return Object.keys(this.collectionDisplay).map((key) => {
      const artistName =
        this.collectionDisplay[key].basic_information.artists[0].name;
      if (artistName !== currentArtist) {
        currentArtist = artistName;
        showArtistName = true;
      } else {
        showArtistName = false;
      }
      return html` <div>
        ${showArtistName
          ? html`<h2 class="shadow discogs-artist-name">${artistName}</h2>`
          : null}
        <discogs-listing
          .basicInformation=${this.collectionDisplay[key].basic_information}
          display="${this.display}"
        ></discogs-listing>
      </div>`;
    });
  }
}
window.customElements.define('discogs-list', DiscogsList);
