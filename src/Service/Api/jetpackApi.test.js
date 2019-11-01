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

describe('JetpackApi update Jetpacks', function () {
    test('Test UpdateJetpack return should not be null or undefined', () => {
        const httpClientMock = {
            fetch: jest.fn().mockResolvedValue({status:'ok'})
        };
        const jetpackApi = new JetpackApi(httpClientMock);
        const jetpack = new Jetpack();
        jetpack.id = 2;
        jetpack.image = 'base64';
        jetpack.name = 'My wonderful jetpack';
        return jetpackApi.updateJetPack().then(resp => {
            expect(resp).not.toBeNull();
            expect(resp).not.toBeUndefined();
        });
    });

    test('Test UpdateJetpack successful update', () => {
        const httpClientMock = {
            fetch: jest.fn().mockResolvedValue({status:'ok'})
        };
        const jetpackApi = new JetpackApi(httpClientMock);
        const jetpack = new Jetpack();
        jetpack.id = 2;
        jetpack.image = 'base64';
        jetpack.name = 'My wonderful jetpack';
        return jetpackApi.updateJetPack().then(resp => {
            expect(resp).toBeTruthy()
        });
    });

    test('Test UpdateJetpack faulty update', () => {
        const httpClientMock = {
            fetch: jest.fn().mockResolvedValue({status:'nok'})
        };
        const jetpackApi = new JetpackApi(httpClientMock);
        const jetpack = new Jetpack();
        jetpack.id = 2;
        jetpack.image = 'base64';
        jetpack.name = 'My wonderful jetpack';
        return jetpackApi.updateJetPack().then(resp => {
            expect(resp).toBeFalsy();
        });
    });
});
