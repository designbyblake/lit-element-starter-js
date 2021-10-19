import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
class TrackListing extends LitElement {
  static get properties() {
    return {
      /**
       * Current selected album
       * @type {array}
       */
      tracks: {type: Array},
    };
  }

  static get styles() {
    return [
      globalStyles,
      css`
        ul {
          margin: 0 0 50px;
          padding: 0;
          list-style: none;
        }

        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 1.125rem;
        }

        .position {
          flex: 0 1 50px;
          width: 50px;
        }

        .track-title {
          flex: 0 1 calc(100% - 50px);
          width: calc(100% - 50px);
        }

        .duration {
          flex: 0 1 200px;
          display: none;
        }

        @media (min-width: 1024px) {
          .track-title {
            flex: 0 1 calc(100% - 250px);
            width: calc(100% - 250px);
          }

          .duration {
            display: block;
          }
        }
      `,
    ];
  }

  render() {
    return html` <div>
      <h2 class="album-section-title-large">Tracks</h2>
      <ul>
        ${this.tracks.map(
          (track) =>
            html` <li>
              <span class="position">${track.position}</span>
              <span class="track-title">${track.title}</span>
              <span class="duration">${track.duration}</span>
            </li>`
        )}
      </ul>
    </div>`;
  }
}
window.customElements.define('track-listing', TrackListing);
