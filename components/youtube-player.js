import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
class YoutubePlayer extends LitElement {
  static get properties() {
    return {
      /**
       * Current selected album
       * @type {object}
       */
      videos: {type: Object},
      /**
       * Current selected album
       * @type {object}
       */
      artists: {type: Object},

      /**
       * Current selected album
       * @type {object}
       */
      id: {type: Object},

      /**
       * Current selected album
       * @type {number}
       */
      currentVideo: {type: Number},
    };
  }
  static get styles() {
    return [
      globalStyles,
      css`
        .video-bg {
          background: url(../assets/img/711.gif) no-repeat 50% 50%;
          margin-bottom: 20px;
        }
        .responsive {
          height: 0;
          overflow: hidden;
          padding-bottom: 56.25%;
          position: relative;
        }
        iframe {
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        ul {
          margin: 0 0 20px;
          padding: 0;
          list-style: none;
        }
        li {
          border-bottom: 1px solid #000;
        }

        button {
          background: none;
          border: none;
          color: #000;
          display: block;
          font-size: 1rem;
          padding: 10px;
          text-align: left;
          transition: all 0.25s ease;
          width: 100%;
        }
        button:hover,
        button:focus,
        button.current {
          background: var(--color-upsdell-red);
          color: var(--color-white);
        }

        button.current {
          background-color: var(--color-dark-sienna);
          font-weight: bold;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.currentVideo = 0;
    this.videosArray = [];
  }
  render() {
    this.videos.forEach((video) => {
      const newId = video.uri.split('?v=');
      if (!newId[1]) {
        return;
      }
      const videoObject = {
        title: video.title,
        embed: `https://www.youtube.com/embed/${newId[1]}`,
      };
      this.videosArray.push(videoObject);
    });
    return html`
      <h2 class="album-section-title-large">Videos</h2>
      <div class="video-bg">
        <div class="responsive">
          <iframe
            src=${this.videosArray[this.currentVideo].embed}
            title=${`${
              this.videosArray[this.currentVideo].title
            } YouTube video player`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <ul>
        ${this.videosArray.map(
          (video, index) => html` <li>
            <button
              type="button"
              @click=${() => this._updateCurrent(index)}
              class="${this.currentVideo === index ? 'current' : null}"
            >
              ${this._videoTitle(video.title)}
            </button>
          </li>`
        )}
      </ul>
    `;
  }
  _videoTitle(title) {
    const splitTitle = title.split(`${this.artist} - `);
    if (splitTitle[1]) {
      return splitTitle[1];
    }
    return title;
  }

  _updateCurrent(index) {
    this.currentVideo = index;
  }
}
window.customElements.define('youtube-player', YoutubePlayer);
