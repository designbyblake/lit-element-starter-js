import {html} from 'lit-element';

import '../components/discogs-listing';
const discogsInfo = {
  id: 11544269,
  master_id: 0,
  master_url: null,
  resource_url: 'https://api.discogs.com/releases/11544269',
  thumb:
    'https://img.discogs.com/pAnOnCsa5jqbsvfmlXluOzznZco=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-11544269-1518224304-1834.jpeg.jpg',
  cover_image:
    'https://img.discogs.com/c6pRnRPAAQqQtGIv09nRSbW6n8E=/fit-in/600x579/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-11544269-1518224304-1834.jpeg.jpg',
  title: 'Hasabe - My Worries',
  year: 2018,
  formats: [
    {
      name: 'Vinyl',
      qty: '1',
      text: 'Maroon, 180 gram',
      descriptions: ['LP', 'Compilation', 'Club Edition'],
    },
  ],
  labels: [
    {
      name: 'Now-Again Records',
      catno: 'NA 5164',
      entity_type: '1',
      entity_type_name: 'Label',
      id: 30886,
      resource_url: 'https://api.discogs.com/labels/30886',
    },
  ],
  artists: [
    {
      name: 'Ayalew Mesfin',
      anv: '',
      join: '',
      role: '',
      tracks: '',
      id: 1973611,
      resource_url: 'https://api.discogs.com/artists/1973611',
    },
  ],
  genres: ['Folk, World, & Country'],
  styles: ['African'],
};
// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: 'Discogs/DiscogsListing',
  component: 'DiscogsListing',
};
const GridTemplate = () =>
  html` <discogs-listing
    .basicInformation=${discogsInfo}
    display="grid"
  ></discogs-listing>`;

const ListTemplate = () =>
  html` <discogs-listing
    .basicInformation=${discogsInfo}
    display="list"
  ></discogs-listing>`;

export const Grid = GridTemplate.bind({});

export const List = ListTemplate.bind({});
