import {LitElement, html, css, unsafeCSS} from 'lit';
import {smallDown} from './media-queries';
export class AlbumCover extends LitElement {
  static get properties() {
    return {
      /**
       * The src to the album cover image.
       * @type {string}
       */
      src: {type: String},

      /**
       * The alt text for the album cover.
       * @type {string}
       */
      alt: {type: String},
      /**
       * The display type text for the album cover.
       * @type {string}
       */
      display: {type: String},
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.display === 'list') {
      this.style.setProperty('--host-width', 'auto');
    }
  }

  static get styles() {
    return css`
      :host {
        width: var(--host-width, 100%);
      }

      .album-cover {
        background-size: 75%;
        display: block;
        margin: 0;
        max-height: 377px;
        max-width: 377px;
        overflow: hidden;
        position: relative;
        width: 100%;
      }
      .album-cover:after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      .album-cover.list {
        flex: 0 1 150px;
        max-height: 100%;
        width: 150px;
      }
      @media ${unsafeCSS(smallDown)} {
        .album-cover {
          flex: 0 1 100px;
          max-height: 100%;
          width: 100px;
        }
      }
      span {
        background: url(/assets/img/711.gif) no-repeat 50% 50%;
        height: 100%;
        position: absolute;
        width: 100%;
      }
      img {
        display: block;
        height: 100%;
        max-width: 200%;
        object-fit: cover;
        transition: opacity 0.3s, height 0.15s;
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <figure class="album-cover ${this.display}">
        <span>
          <img src="${this.src}" alt="${this.alt}" loading="lazy" />
        </span>
      </figure>
    `;
  }
}

window.customElements.define('album-cover', AlbumCover);
