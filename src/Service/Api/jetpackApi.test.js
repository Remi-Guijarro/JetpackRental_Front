const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');
describe('getJetpacks function', () => {
    test('should return an array of size 1', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };
        httpClientMock.fetch.mockResolvedValue([
            {
                id: '123',
                name: 'The Jetpack',
                image: 'base64 ...'
            }
        ]);
        const jetpackApi = new JetpackApi(httpClientMock);
        return jetpackApi.getJetpacks()
            .then(resp => {
                expect(Array.isArray(resp)).toBe(true);
                expect(resp.length).toBe(1);
            });
    });

    test('should return an array of size 2', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };
        httpClientMock.fetch.mockResolvedValue([
            {
                id: '123',
                name: 'The First Jetpack',
                image: 'base64 ...'
            },
            {
                id: '456',
                name: 'The Second Jetpack',
                image: 'base64 ...'
            }
        ]);
        const jetpackApi = new JetpackApi(httpClientMock);
        return jetpackApi.getJetpacks()
            .then(resp => {
                expect(Array.isArray(resp)).toBe(true);
                expect(resp.length).toBe(2);
            });
    });
    test('should return the jetpacks with correct values', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };
        httpClientMock.fetch.mockResolvedValue([
            {
                id: '123',
                name: 'The First Jetpack',
                image: 'base64 ...'
            },
            {
                id: '456',
                name: 'The Second Jetpack',
                image: 'base64 ...'
            }
        ]);
        const jetpackApi = new JetpackApi(httpClientMock);
        return jetpackApi.getJetpacks()
            .then(resp => {
                expect(resp[0]).toBeInstanceOf(Jetpack);
                expect(resp[0].id).toBe('123');
                expect(resp[0].name).toBe('The First Jetpack');
                expect(resp[0].image).toBe('base64 ...');
                expect(resp[1]).toBeInstanceOf(Jetpack);
                expect(resp[1].id).toBe('456');
                expect(resp[1].name).toBe('The Second Jetpack');
                expect(resp[1].image).toBe('base64 ...');
            });
    });
});
describe('updateJetpack function', () => {
    test('return should not be null or undefined', () => {
        const httpClientMock = {
            fetch: jest.fn().mockResolvedValue(
                {
                    id: '123',
                    name: 'Updated Jetpack',
                    image: 'base64 ...'
                }
            )
        };
        const jetpackApi = new JetpackApi(httpClientMock);
        const jetpack = new Jetpack();
        jetpack.id = 123;
        jetpack.image = 'base64 ..';
        jetpack.name = 'Updated Jetpack';
        return jetpackApi.updateJetPack(jetpack).then(resp => {
            expect(resp).not.toBeNull();
            expect(resp).not.toBeUndefined();
        });
    });
    test('Test UpdateJetpack successful update', () => {
        const httpClientMock = {
            fetch: jest.fn().mockResolvedValue(
                {
                    id: '123',
                    name: 'Updated Jetpack',
                    image: 'newImg.jpg'
                }
            )
        };
        const jetpackApi = new JetpackApi(httpClientMock);
        const jetpack = new Jetpack();
        jetpack.id = 123;
        jetpack.name = 'Updated Jetpack';
        jetpack.image = 'newImg.jpg';
        return jetpackApi.updateJetPack(jetpack).then(resp => {
            // The jetpack is sent to the back and should be unchanged
            expect(resp.id).toBe('123');
            expect(resp.name).toBe('Updated Jetpack');
            expect(resp.image).toBe('newImg.jpg');
        });
    });
});

describe('saveJetpacks function', () => {
    test('should return a non empty object', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: '123',
                name: 'The Jetpack',
                image: 'base64 ...'
            }
        ]);

        const jetpack = new Jetpack();
        jetpack.name = 'Updated Jetpack';
        jetpack.image = 'newImg.jpg';
        const jetpackApi = new JetpackApi(httpClientMock);

        return jetpackApi.saveJetpack(jetpack)
            .then(returnedJetpack => {
                expect(returnedJetpack).not.toBeNull();
                expect(returnedJetpack).not.toBeUndefined();
            });
    });

    test('should return jetpack with an Id', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: '123',
                name: 'The Jetpack',
                image: 'base64 ...'
            }
        ]);

        const jetpack = new Jetpack();
        jetpack.name = 'Updated Jetpack';
        jetpack.image = 'newImg.jpg';
        const jetpackApi = new JetpackApi(httpClientMock);

        return jetpackApi.saveJetpack(jetpack)
            .then(returnedJetpack => {
                expect(returnedJetpack.id).not.toBeNull();
            });
    });
});