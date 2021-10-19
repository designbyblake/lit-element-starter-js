import {LitElement, html, css} from 'lit-element';
import {callDispatch} from '../utils/state';
import {globalStyles} from './global-styles';
import {close} from './svgs';
import './track-listing';
import './youtube-player';
import './album-info-label';

class AlbumInfoModal extends LitElement {
  static get properties() {
    return {
      /**
       * Current selected album
       * @type {object}
       */
      currentAlbum: {type: Object},
    };
  }
  static get styles() {
    return [
      globalStyles,
      css`
        .album-info {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 50;
        }

        .bg {
          background: rgba(0, 0, 0, 0.8);
          height: 100%;
          left: 0;
          opacity: var(--album-info-bg-opacity, 0);
          position: fixed;
          top: 0;
          transition: opacity 0.25s ease;
          width: 100%;
          z-index: 50;
        }

        article {
          background: #fff;
          border-radius: 10px;
          height: 95vh;
          left: 50%;
          max-width: 1400px;
          opacity: var(--article-opacity, 0);
          padding: 25px;
          position: fixed;
          top: 50%;
          transform: var(--article-transform, translate(-50%, -50%) scale(0.5));
          transition: all 0.25s ease;
          transition-delay: var(--article-transition-delay, 0);
          width: 95vw;
          z-index: 51;
        }

        .overflow {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }

        .content *:first-child {
          margin-top: 0;
        }

        .title {
          color: var(--color-upsdell-red);
          font-size: 1.75rem;
          margin-bottom: 10px;
        }

        p {
          font-size: 1.125rem;
          line-height: 1.2;
          margin-top: 0;
        }

        .close-button {
          background: none;
          border: none;
          position: absolute;
          right: 0px;
          top: 14px;
          transition: all 0.25s ease;
        }
        .close-button svg {
          height: 32px;
          width: 32px;
        }

        .close-button:hover svg,
        .close-button:focus svg {
          fill: var(--color-upsdell-red);
        }

        @media (min-width: 1460px) {
          article {
            padding: 50px;
          }
        }

        @media (min-width: 768px) {
          .overflow {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
          }

          .media {
            flex: 0 1 150px;
            width: 150px;
          }

          .content {
            flex: 0 1 calc(100% - 175px);
            padding-right: 10px;
            width: calc(100% - 175px);
          }
        }

        @media (min-width: 1024px) {
          .media {
            flex: 0 1 300px;
            width: 300px;
          }

          .content {
            flex: 0 1 calc(100% - 350px);
            width: calc(100% - 350px);
          }

          .title {
            font-size: 2.25rem;
          }
        }
      `,
    ];
  }

  firstUpdated() {
    this.shadowRoot.getElementById('album-info').focus();
    setTimeout(() => {
      this.style.setProperty('--album-info-bg-opacity', 1);
      this.style.setProperty('--article-opacity', 1);
      this.style.setProperty(
        '--article-transform',
        'translate(-50%, -50%) scale(1)'
      );
      this.style.setProperty('--article-transition-delay', '0.25s');
    }, 10);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._keypress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._keypress);
  }

  render() {
    const {
      title,
      notes,
      artists_sort: ArtistSort,
      labels,
      year,
      videos,
      tracklist,
      images,
      id,
    } = this.currentAlbum;
    const alt = `Images from  ${title} by ${ArtistSort}`;
    const ariaLabel = `${title} by ${ArtistSort}`;

    return html`
      <div
        id="album-info"
        class="album-info"
        tabindex="-1"
        .aria-label=${ariaLabel}
      >
        <div class="bg"></div>
        <article>
          <div class="overflow">
            <div class="content">
              <h2 class="title">${title}</h2>
              ${ArtistSort && html`<p className="artist">${ArtistSort}</p>`}
              ${year && year !== '0'
                ? html`<p className="year">${year}</p>`
                : ''}
              ${labels &&
              html` <album-info-label .labels=${labels}></album-info-label> `}
              ${notes &&
              html`
                <h2 class="album-section-title-large">Album Notes</h2>
                <div><p>${notes}</p></div>
              `}
              ${tracklist &&
              html`<track-listing .tracks=${tracklist}></track-listing>`}
              ${videos &&
              html`
                <youtube-player
                  .videos=${videos}
                  .artist=${ArtistSort}
                  .id=${id}
                ></youtube-player>
              `}
            </div>

            <div class="media">
              ${images &&
              images.map(
                (img, index) => html`
                  <img .src=${img.uri} .alt=${alt} loading="lazy" />
                `
              )}
            </div>
          </div>
          <button @click=${this._close} class="close-button">
            <span class="a11y">Close Artist Information</span>
            <span aria-hidden="true"> ${close} </span>
          </button>
        </article>
      </div>
    `;
  }

  _close = () => {
    this.style.setProperty('--album-info-bg-opacity', 0);
    this.style.setProperty('--article-opacity', 0);
    this.style.setProperty(
      '--article-transform',
      'translate(-50%, -50%) scale(0.5)'
    );
    this.style.setProperty('--article-transition-delay', '0');
    setTimeout(() => {
      const action = {
        data: {currentAlbumShow: false},
        type: 'CLOSE_MODAL',
      };

      callDispatch(this, action);
    }, 250);
  };

  _keypress = (e) => {
    if (e.keyCode === 27) {
      this._close();
    }
  };
}
window.customElements.define('album-info-modal', AlbumInfoModal);
