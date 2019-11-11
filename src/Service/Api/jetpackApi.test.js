const JetpackApi = require('./JetpackApi');
const JetpackEntity = require('../../Entity/Jetpack');

const testJetpackId_1 = '123';
const testJetpackName_1 = 'Test Jetpack 01';
const testImageUrl_1 = 'test/url/image01.jpg';

const testJetpackId_2 = '456';
const testJetpackName_2 = 'Test Jetpack 02';
const testImageUrl_2 = 'test/url/image02.jpg';

const testUpdatedJetpackName = 'Test Updated Jetpack';
const testNewImageUrl = 'test/url/newImage.jpg';

describe('getJetpacks function', () => {
    test('should return an array of size 1', () => {
        const httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: testJetpackId_1,
                name: testJetpackName_1,
                image: testImageUrl_1
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
                id: testJetpackId_1,
                name: testJetpackName_1,
                image: testImageUrl_1
            },
            {
                id: testJetpackId_2,
                name: testJetpackName_2,
                image: testImageUrl_2
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
                id: testJetpackId_1,
                name: testJetpackName_1,
                image: testImageUrl_1
            },
            {
                id: testJetpackId_2,
                name: testJetpackName_2,
                image: testImageUrl_2
            }
        ]);

        const jetpackApi = new JetpackApi(httpClientMock);

        return jetpackApi.getJetpacks()
            .then(resp => {
                expect(resp[0]).toBeInstanceOf(JetpackEntity);
                expect(resp[0].id).toBe(testJetpackId_1);
                expect(resp[0].name).toBe(testJetpackName_1);
                expect(resp[0].image).toBe(testImageUrl_1);

                expect(resp[1]).toBeInstanceOf(JetpackEntity);
                expect(resp[1].id).toBe(testJetpackId_2);
                expect(resp[1].name).toBe(testJetpackName_2);
                expect(resp[1].image).toBe(testImageUrl_2);
            });
       });
});

describe('updateJetpack function', () => {
    test('return should not be null or undefined', () => {
        const httpClientMock = {
            fetch: jest.fn().mockResolvedValue(
                {
                    id: testJetpackId_1,
                    name: testUpdatedJetpackName,
                    image: testNewImageUrl
                }
            )
        };
        const jetpackApi = new JetpackApi(httpClientMock);
        const jetpack = new JetpackEntity();

        jetpack.id = testJetpackId_1;
        jetpack.name = testUpdatedJetpackName;
        jetpack.image = testNewImageUrl;

        return jetpackApi.updateJetPack(jetpack).then(resp => {
            expect(resp).not.toBeNull();
            expect(resp).not.toBeUndefined();
        });
    });

    test('Test UpdateJetpack successful update', () => {
        const httpClientMock = {
            fetch: jest.fn().mockResolvedValue(
                {
                    id: testJetpackId_1,
                    name: testUpdatedJetpackName,
                    image: testNewImageUrl
                }
            )
        };

        const jetpackApi = new JetpackApi(httpClientMock);
        const jetpack = new JetpackEntity();

        jetpack.id = testJetpackId_1;
        jetpack.name = testUpdatedJetpackName;
        jetpack.image = testNewImageUrl;

        return jetpackApi.updateJetPack(jetpack).then(resp => {
            // The jetpack is sent to the back-end and returned as is
            expect(resp.id).toBe(testJetpackId_1);
            expect(resp.name).toBe(testUpdatedJetpackName);
            expect(resp.image).toBe(testNewImageUrl);
        });
    });
});
