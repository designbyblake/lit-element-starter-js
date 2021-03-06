import {css} from 'lit-element';
export const globalStyles = css`
  main {
    display: block;
    position: relative;
    z-index: 1;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  b,
  strong {
    font-weight: 700;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
    max-width: 100%;
    height: auto;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  label {
    cursor: pointer;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none !important;
  }

  * {
    box-sizing: border-box;
  }

  html {
    color: var(--text-color);
    margin: 0;
    padding: 0;
  }

  body {
    --scrollbar-width: calc(100vw - 100%);
    color: var(--black);
    font-family: var(--font-sans-serif);
    font-size: 1.8rem;
    font-weight: 400;
    margin: 0;
    overflow-x: hidden;
    padding: 0;
    width: 100%;
  }

  .sr-only,
  .a11y,
  .access {
    -webkit-clip-path: inset(50%);
    border: 0;
    clip-path: inset(50%);
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .sr-only-focusable:active,
  .a11y-focusable:active,
  .access-focusable:active {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
    white-space: normal;
    -webkit-clip-path: none;
    clip-path: none;
  }

  .no-margin-top {
    margin-top: 0;
  }

  .no-margin-bottom {
    margin-bottom: 0;
  }

  .no-margin-left {
    margin-left: 0;
  }

  .no-margin-right {
    margin-right: 0;
  }

  .no-margin {
    margin: 0;
  }

  .no-padding-top {
    padding-top: 0;
  }

  .no-padding-bottom {
    padding-bottom: 0;
  }

  .no-padding-left {
    padding-left: 0;
  }

  .no-padding-right {
    padding-right: 0;
  }

  .no-padding {
    padding: 0;
  }

  .hide-small {
    @media (max-width: 767px) {
      display: none;
    }
  }

  .shadow {
    color: #fff;
    text-shadow: 3px 2px 8px black;
  }

  /* Headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-sans-serif);
    line-height: 1.2;
    margin-bottom: var(--gutter);
    margin-top: var(--gutter);
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    text-decoration: none;
  }

  h1 a:hover,
  h1 a:focus,
  h2 a:hover,
  h2 a:focus,
  h3 a:hover,
  h3 a:focus,
  h4 a:hover,
  h4 a:focus,
  h5 a:hover,
  h5 a:focus h6 a:hover,
  h6 a:focus {
    text-decoration: underline;
    text-decoration-color: #00bf79;
  }

  h1 {
    font-size: 1.5rem;
    margin-top: 0;
  }

  h2 {
    font-size: 2.187rem;
  }

  h3 {
    font-size: 1.875rem;
  }

  h4 {
    font-size: 1.625rem;
  }

  h5 {
    font-size: 1.5rem;
  }

  h6 {
    font-size: 1.25rem;
  }

  /* Button */
  button {
    cursor: pointer;
    margin-right: 10px;
    transition: all 0.25s ease;
  }

  button[disabled] {
    cursor: default;
    opacity: 0.3;
    pointer-events: none;
  }

  .btn {
    align-items: center;
    background: none;
    border-radius: 4px;
    border: none;
    display: flex;
    font-size: 1.125rem;
    justify-content: center;
    min-height: 48px;
    padding: 5px 10px;
  }

  .btn__icon {
    height: auto;
    margin-right: 5px;
    width: 24px;
  }

  .btn--outline {
    background-color: var(--button-bg);
    border: 2px solid #fff;
    color: #fff;
    text-shadow: 3px 2px 8px black;
    transition: background-color 0.25s ease;
  }

  .btn--outline:hover,
  .btn--outline:focus {
    background: var(--button-hover);
  }

  .btn--shadow {
    box-shadow: var(--box-shadow);
  }

  .btn--solid {
    background: var(--button-bg);
    color: #fff;
    font-size: 1.125rem;
    text-shadow: 3px 2px 8px black;
    transition: background-color 0.25s ease;
  }
  .btn--solid:hover,
  .btn--solid:focus {
    background: var(--button-hover);
  }

  /* Layout */
  .container {
    margin: auto;
    max-width: 1200px;
    padding: 0 20px;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 2.25rem;
    }
    .btn {
      font-size: 1.3125rem;
    }
  }

  @media (min-width: 1000px) {
    h1 {
      font-size: 4rem;
    }
  }

  @media (min-width: 1024px) {
    h2 {
      font-size: 3.125rem;
    }

    h3 {
      font-size: 2.8125rem;
    }

    h4 {
      font-size: 2.1875rem;
    }

    h5 {
      font-size: 1.75rem;
    }

    h6 {
      font-size: 1.5rem;
    }
  }

  .album-section-title {
    color: var(--color-upsdell-red);
    font-size: 1.3125rem;
    margin-bottom: 10px;
  }
  .album-section-title-large {
    color: var(--color-upsdell-red);
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  @media (prefers-reduced-motion) {
    * {
      transition: none !important;
    }
  }
`;
