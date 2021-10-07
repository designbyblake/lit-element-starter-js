import {LitElement, html, css} from 'lit-element';
import {globalStyles} from './global-styles';
class CollectionHeader extends LitElement {
  static properties = {
    collectionDisplayLength: {type: Number},
    collectionLength: {type: Number},
    collectionTotal: {type: Number},
    stillLoading: {type: Boolean},
    userName: {type: String},
  };

  static get styles() {
    return [globalStyles];
  }
  render() {
    let text = '';
    if (this.stillLoading === true) {
      text = `${this.collectionLength} out of ${this.collectionTotal} loaded.`;
    } else if (this.collectionDisplayLength === this.collectionTotal) {
      text = `Collection size, ${this.collectionTotal}`;
    } else {
      text = `Showing ${this.collectionDisplayLength} of ${this.collectionTotal} items`;
    }
    return html`
      <h1 class="shadow no-margin-bottom">${this.userName}'s Collection</h1>
      <p class="shadow no-margin-top">${text}</p>
    `;
  }
}
window.customElements.define('collection-header', CollectionHeader);
