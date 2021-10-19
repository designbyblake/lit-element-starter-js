import {html} from 'lit-element';

import '../components/album-cover';

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Discogs/AlbumCover',
  component: 'AlbumCover',
  argTypes: {
    display: {
      options: ['grid', 'list'],
      control: {type: 'radio'},
    },
  },
};
const Template = ({alt, display, src}) =>
  html`<album-cover .alt=${alt} .display=${display} .src=${src}></album-cover>`;

export const Primary = Template.bind({});
Primary.args = {
  // The source of the image
  src: 'https://img.discogs.com/A1EIKh2bj0D4y62uM7MMWwMySeo=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1374939-1523715064-7850.jpeg.jpg',
  // The alt text for an image
  alt: 'Bad Brains Album Cover',
};
