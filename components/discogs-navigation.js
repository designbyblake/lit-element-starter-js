import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
import {record} from './svgs';
export class DiscogsNavigation extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        .nav {
          background: var(--nav-background);
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
          padding: 5px 0;
          margin-bottom: 30px;
        }
        .container {
          align-items: center;
          display: flex;
        }

        .logo {
          align-items: center;
          display: flex;
          margin-right: 30px;
        }

        .svg {
            margin-right: 10px;
            width: 50px;
        }
            svg {
              filter: drop-shadow(4px 4px 5px rgba(40, 0, 0, 0.5));
              height: auto;
              width: 50px;
            }
          

        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          font-size: 1rem;
          line-height: 1;
          margin: 0 15px 0 0;

          &:last-child {
            margin-right: 0;
          }
        }

        a {
          color: #000;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        a:hover,
        a:focus {
            color: var(--red);
            text-decoration: underline;
          }

          a.active {
            color: var(--red);
            font-weight: bold;
          }
      `,
    ];
  }

  render() {
    return html`
      <nav class="nav">
        <div class="container">
          <div class="logo">
            <a href="/collection">
              <span class="svg"> ${record} </span>
              <span class="text a11y">Discogs React App</span>
            </a>
          </div>
          <ul class="nav__list">
            <li class="nav__item">
              <a href="/" class="nav__link"> Change User </a>
            </li>
            <li class="nav__item">
              <a href="/collection" class="nav__link"> Collection </a>
            </li>
          </ul>
        </div>
      </nav>
    `;
  }
}
window.customElements.define('discogs-navigation', DiscogsNavigation);
