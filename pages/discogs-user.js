import {LitElement, html} from 'lit-element';
import '../components/background-image';
import '../components/discogs-user-form';
export class DiscogsUser extends LitElement {
  /**
   * In connectedCallback() you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is adding
   * event listeners to nodes external to the element, like a keydown event handler
   * added to the window.
   * 
   * connectedCallback() {
    super.connectedCallback();
    console.log('connectedCallback');
  }
   */

  /**
   * Used to remove event listeners added on connectedCallback() to prevent
   * Memory leaks.
   * 
   * disconnectedCallback() {
    super.disconnectedCallback();
    console.log('disconnectedCallback');
  }
   */

  render() {
    return html`
      <background-image
        bgImage="/assets/img/turntable-4725439_1920.jpeg"
      ></background-image>
      <discogs-user-form></discogs-user-form>
    `;
  }
}
window.customElements.define('discogs-user', DiscogsUser);
