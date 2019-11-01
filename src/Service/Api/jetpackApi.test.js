const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');
describe('JetpackApi  get Jetpacks', function () {
    test('Test GetJetpacks', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: '123',
                name: 'The Jetpack',
                image: 'base64 ...'
            }
        ]);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.getJetpacks().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(Jetpack)
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
