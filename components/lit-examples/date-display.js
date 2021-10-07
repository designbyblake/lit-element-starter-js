import {LitElement, html} from 'lit-element';
import {isSameDate} from './utils/date-utils';

class DateDisplay extends LitElement {
  static properties = {
    date: {
      hasChanged: (value, oldValue) => {
        return !isSameDate(value, oldValue);
      },
    },
  };

  get datefield() {
      return this.renderRoot?.querySelector('#datefield') ?? null;
  }

  frames = [
      {backgroundColor: '#f00'},
      {backgroundColor: '#FF0'},
      {backgroundColor: '#f0F'},

  ];

  render() {
      return html`<span id="datefield">${this.date?.toLocaleDateString()}</span>`;
  }

  updated(changed) {
      if(changed.has('date')) {
          this.datefield.animate(this.frames, 10000);
      }
  }
}
customElements.define('date-display', DateDisplay);
