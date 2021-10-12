import {LitElement, html, css, unsafeCSS} from 'lit-element';
import {globalStyles} from './global-styles';
import {tabletUp} from './media-queries';
import './album-cover';

class DiscogsListing extends LitElement {
  static properties = {
    basicInformation: {type: Object},
    display: {type: String},
  };

  static get styles() {
    return [
      globalStyles,
      css`
        article {
          align-items: center;
          background: #fff;
          box-shadow: var(--box-shadow);
          display: flex;
          height: 100%;
          overflow: hidden;
          position: relative;
          transition: all 0.35s ease;
        }

        article.discogs-listing--list {
          margin-bottom: 20px;
        }

        .info {
          flex: 0 1 calc(100% - 100px);
          padding: 10px;
          width: calc(100% - 100px);
        }

        h2 {
          margin: 0;
          font-size: 1.125rem;
          line-height: 1.1;
          font-weight: bold;
        }
        button {
          background: none;
          border: none;
          color: var(--color-upsdell-red);
          cursor: pointer;
          display: inline-block;
          margin-right: 0;
          padding-left: 0;
          text-align: left;
        }

        button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        button:focus {
          outline: none;
        }

        .artist,
        .formats {
          font-size: 1rem;
          line-height: 1.1;
          margin: 0;
          transition: inherit;
        }

        .artist {
          transition: inherit;
        }

        .artist a {
          color: #000;
          font-weight: bold;
        }
        .artist a:hover,
        .artist a:focus {
          text-decoration: none;
        }

        .formats {
          display: none;
          font-size: 1rem;
          line-height: 1.3;
          margin-top: 10px;
        }

        @media ${unsafeCSS(tabletUp)} {
          article:not(.discogs-listing--list) {
            align-items: flex-start;
            border-radius: 10px;
            flex-direction: column;
            max-width: 365px;
          }

          article.discogs-listing--list .info {
            padding: 20px;
          }

          .info {
            padding: 20px 20px 40px;
            flex: 0 1 auto;
            width: 100%;
          }
          button {
            font-size: 1.5rem;
          }
          .artist,
          .formats {
            font-size: 1.25rem;
            line-height: 1.3;
          }

          .formats {
            display: block;
          }
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  render() {
    const {
      artists,
      title,
      cover_image: coverImage,
      formats,
      id,
    } = this.basicInformation;

    let theFormats =
      formats[0].name + formats[0].descriptions?.map((format) => ` ${format}`);
    if (formats[0].text) {
      theFormats += `, ${formats[0].text}`;
    }
    return html`
      <article
        class="discogs-listing discogs-listing--${this.display}"
        id="${id}"
      >
        <album-cover
          alt="${this._getAlt(title)}"
          src="${coverImage}"
          class=${this.display}
          display=${this.display}
        ></album-cover>
        <div class="info">
          <h2>
            <button type="button" aria-label="${title} by ${artists[0].name}">
              ${title}
            </button>
          </h2>
          <p class="artist">${artists[0].name}</p>
          <p class="formats">${theFormats}</p>
        </div>
      </article>
    `;
  }
  _getAlt = (altTitle) => {
    let alt = `Album cover of ${altTitle}`;
    if (this.basicInformation.artists && this.basicInformation.artists[0]) {
      alt += ` from ${this.basicInformation.artists[0].name}`;
    }
    return alt;
  };
}
window.customElements.define('discogs-listing', DiscogsListing);
