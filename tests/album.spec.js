import chai, { expect } from 'chai';
import { getAlbum, getAlbumTracks, getAlbums } from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Album', () => {

    let stubFetched;
    let promise;
    
    beforeEach(() => {
        stubFetched = sinon.stub(global, 'fetch');
        promise = stubFetched.returnsPromise();
    });

    afterEach(() => {
        stubFetched.restore();
    });

    describe('smoke tests', () => {

        it('should have getAlbum method', () => {
            expect(getAlbum).to.exist;
        });

        it('should have getAlbums method', () => {
            expect(getAlbums).to.exist;
        });

        it('should have getAlbumTracks method', () => {
            expect(getAlbumTracks).to.exist;
        });

    });

    describe('getAlbum', () => {

        it('shuld call fetch method', () => {
            const album = getAlbum();
            expect(stubFetched).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubFetched).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy')

            const albumTwo = getAlbum('4aawyAvmqN3uQ7FjRGB9');
            expect(stubFetched).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAvmqN3uQ7FjRGB9')
        });

        it('should return the correct data from promise', () => {
            promise.resolves({ album: 'name' });
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(album.resolveValue).to.be.eql({ album: 'name' });
        })

    });

    describe('getAlbums', () => {

        it('shuld call fetch method', () => {
            const album = getAlbums();
            expect(stubFetched).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const albums = getAlbums(['1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);
            expect(stubFetched).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc')
        });

        it('should return the correct data from promise', () => {
            promise.resolves({ album: 'name' });
            const albums = getAlbums(['1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);
            expect(albums.resolveValue).to.be.eql({ album: 'name' });
        });

    });

    describe('getAlbumTracks', () => {

        it('shuld call fetch method', () => {
            const albumTracks = getAlbumTracks();
            expect(stubFetched).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubFetched).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks')
        });

        it('should return the correct data from promise', () => {
            promise.resolves({ album: 'name' });
            const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
            expect(albumTracks.resolveValue).to.be.eql({ album: 'name' });
        });

    });
    
});
