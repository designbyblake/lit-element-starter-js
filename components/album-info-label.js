import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
class AlbumInfoLabel extends LitElement {
  static get properties() {
    return {
      /**
       * List of record labels
       * @type {object}
       */
      labels: {type: Object},
    };
  }
  static get styles() {
    return [
      globalStyles,
      css`
        ul {
          list-style: none;
          padding-left: 0;
          margin: 0 0 30px;
        }

        li {
          font-size: 1.125rem;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="album-info-labels">
        <h3 class="album-section-title">
          Label${this.labels.length > 1 ? 's' : ''}
        </h3>
        <ul>
          ${this.labels.map((label, index) => html` <li>${label.name}</li>`)}
        </ul>
      </div>
    `;
  }
}
window.customElements.define('album-info-label', AlbumInfoLabel);
