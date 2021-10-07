import { LitElement, html  } from "lit-element";
import { localDateFromUTC } from "./utils/date-utils";
import './date-display.js';

class DatePicker extends LitElement {
    static properties = {
        date:{},
    };

    render() {
        return html`
            <p>Choose a date:</p>
                <input type="date" @change=${this._dateChanged}>
            </p>
            <p><button @click=${this._chooseToday}>Choose Today</button></p>
            <p>Date chosen: <date-display .date=${this.date}></date-display></p>
            `;
    }

    _dateChanged(e) {
        const utcDate = e.target.valueAsDate;
        if(utcDate) {
            this.date = localDateFromUTC(utcDate);
        }
    }

    _chooseToday() {
        this.date = new Date();
    }
}
customElements.define('date-picker', DatePicker);