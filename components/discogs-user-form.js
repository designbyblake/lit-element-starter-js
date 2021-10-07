import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';

export class DiscogsUserForm extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        .discogs-user {
          margin: auto;
          max-width: 1000px;
          padding: 0 20px;
          position: relative;
          z-index: 3;
        }
        h1 {
          font-size: 2.65rem;
          line-height: 1.15;
        }

        label {
          display: block;
          font-size: 2rem;
          margin-bottom: 5px;

          @media (min-width: 768px) {
            font-size: 2.25rem;
          }
        }

        input {
          border-radius: 4px;
          border: none;
          box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);
          display: block;
          font-size: 1.5rem;
          margin: auto 0 10px;
          max-width: 100%;
          padding: 10px;
        }
      `,
    ];
  }

  static properties = {
    username: {type: String},
  };
  constructor() {
    super();
    this.username = '';
  }

  _usernameUpdate(e) {
    this.username = e.target.value;
  }
  render() {
    return html`
      <div class="discogs-user">
        <h1 class="shadow">View Discogs User Collection</h1>
        <form action="/collection/${this.username}">
          <label for="username" class="shadow"> Discogs Username </label>

          <input
            type="text"
            id="usernames"
            placeholder="designbyblake"
            autocomplete="off"
            @keyup=${this._usernameUpdate}
          />
          <button
            class="btn btn--outline btn--shadow"
            type="submit"
            ?disabled="${this.username.length === 0}"
          >
            Submit
          </button>
        </form>
      </div>
    `;
  }
}
window.customElements.define('discogs-user-form', DiscogsUserForm);
