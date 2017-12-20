import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbum, searchArtists, searchTrack, searchPlaylist } from '../src/search';

describe('Search', () => {

    let fetchedStub;
    let promise;

    beforeEach(() => {
        fetchedStub = sinon.stub(global, 'fetch');
        promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
        fetchedStub.restore();
    })

    describe('smoke tests', () => {

        it('should exist the search method', () =>{
            expect(search).to.exist;
        });

        it('should exist the searchAlbum method', () =>{
            expect(searchAlbum).to.exist;
        });

        it('should exist the searchArtists method', () =>{
            expect(searchArtists).to.exist;
        });

        it('should exist the searchTrack method', () =>{
            expect(searchTrack).to.exist;
        });

        it('should exist the searchPlaylist method', () =>{
            expect(searchPlaylist).to.exist;
        });

    });

    describe('Generic search', () => {

        it('should call fetch function', () => {
            const artists = search();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should receive the correct url to fetch', () => {
            context('passing one type', () => {
                const artists = search('Incubus', 'artist');
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    
                const albums = search('Incubus', 'album');
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
            });

            context('passing more than on type', () => {
                const artistsAndAlbums = search('Incubus', ['artist', 'album']);
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
            });
        });

        it('should be return the JSON Data from the Promise', () => {
            promise.resolves({ body: 'json' });
            const artists = search('Incubus', 'artist');
            expect(artists.resolveValue).to.be.eql({body: 'json'});
        });

    })

    describe('Search artists', () => {

        it('should call fetch function', () => {
            const artists = searchArtists('Incubus');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with correct URL', () => {
            const artists = searchArtists('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

            const artistsTwo = searchArtists('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
        })

    });

    describe('Search album', () => {
        
        it('should call fetch function', () => {
            const album = searchAlbum('Muse');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with correct URL', () => {
            const album = searchAlbum('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');

            const albumTwo = searchAlbum('Muse');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
        })

    });

    describe('Search track', () => {
        
        it('should call fetch function', () => {
            const tracks = searchTrack('under the bridge');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with correct URL', () => {
            const track = searchTrack('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

            const trackTwo = searchTrack('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
        })

    });

    describe('Search playlists', () => {
        
        it('should call fetch function', () => {
            const playlist = searchPlaylist('under the bridge');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with correct URL', () => {
            const playlist = searchPlaylist('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

            const playlistTwo = searchPlaylist('Incubus');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
        })

    });

});
