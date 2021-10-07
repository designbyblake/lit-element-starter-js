import {LitElement, html, css} from 'lit-element';

export class BackgroundImage extends LitElement {
    static properties = {
        bgImage: {type: String}
    }

    constructor() {
        super();
        this.bgImage = '/assets/img/records-5723264_1920.jpeg';
    }

    static get styles() {
        return css`
          .background,
          .overlay,
          .image {
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
          }
    
          .background {
            z-index: -1;
          }
    
          .overlay {
            background: rgba(0, 0, 0, 0.15);
            z-index: 2;
          }
    
          .image {
            background: var(--background-color) no-repeat 50% 50%;
            background-size: cover;
            z-index: 1;
          }
        `;
      }
    
      render() {
        return html`
          <div class="background">
            <div class="overlay"></div>
            <div class="image" style="background-image:url(${this.bgImage})"></div>
          </div>
        `;
      }
}
window.customElements.define('background-image', BackgroundImage)