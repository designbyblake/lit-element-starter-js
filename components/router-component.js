import {LitElement, html} from 'lit';
import page from '//unpkg.com/page/page.mjs';

import {globalStyles} from './global-styles';
import './discogs-navigation';

const routerContent = document.querySelector('#content');
export class RouterComponent extends LitElement {
  static get properties() {
    return {
      route: {},
      page: {},
      content: {},
      ctx: {},
    };
  }

  static get styles() {
    return globalStyles;
  }

  constructor() {
    super();
    page('*', function (ctx, next) {
      if (ctx.init) {
        next();
      } else {
        routerContent.classList.add('transition');
        setTimeout(function () {
          routerContent.classList.remove('transition');
          next();
        }, 300);
      }
    });
    page('/', () => {
      (async () => {
        await import('../pages/discogs-user.js');
        this.route = 'index';
      })();
    });

    page('/collection/', () => {
      (async () => {
        await import('../pages/discogs-collection');
        this.route = 'collection';
      })();
    });

    page('/collection/:discogsUser', (ctx) => {
      (async () => {
        await import('../pages/discogs-collection');
        this.route = 'collection';
        this.ctx = ctx.params.discogsUser;
      })();
    });

    page('/examples/', () => {
      (async () => {
        await import('../pages/examples-page.js');
        this.route = 'example';
      })();
    });
    page('/examples/:test', (ctx) => {
      (async () => {
        await import('../pages/examples-page.js');
        this.route = 'example';
        this.ctx = ctx.params.test;
      })();
    });

    page();
  }

  render() {
    if (this.route === 'index') {
      this.page = html` <discogs-user></discogs-user> `;
    } else if (this.route === 'example') {
      this.page = html`<examples-page></examples-page>`;
    } else if (this.route === 'collection') {
      this.page = html`<discogs-collection
        discogsUser="${this.ctx}"
      ></discogs-collection>`;
    }

    return html`
      <discogs-navigation></discogs-navigation>
      ${this.page}
    `;
  }
}

window.customElements.define('router-component', RouterComponent);
