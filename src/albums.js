global.fetch = require('node-fetch');

import { searchAlbum } from './search';

const albums = searchAlbum('Incubus');

albums.then(data => console.log(data))