'use strict';

var _search = require('./search');

var _album = require('./album');

module.exports = { search: _search.search, searchAlbum: _search.searchAlbum, searchArtists: _search.searchArtists, searchTrack: _search.searchTrack, searchPlaylist: _search.searchPlaylist, getAlbum: _album.getAlbum, getAlbumTracks: _album.getAlbumTracks, getAlbums: _album.getAlbums };