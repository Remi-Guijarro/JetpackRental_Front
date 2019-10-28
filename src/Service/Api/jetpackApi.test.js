const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');
describe('getJetpacks function', () => {
    test('should get all displayed jetpacks', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64 ..."
            }
        ]);

        const jetpackApi = new JetpackApi(httpClientMock);
        return jetpackApi.getJetpacks()
            .then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(Jetpack);
            expect(resp[0].id).toBe('123');
            expect(resp[0].name).toBe('The Jetpack');
            expect(resp[0].image).toBe('base64 ...');
        });
    });
});
