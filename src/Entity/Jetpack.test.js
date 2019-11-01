const Jetpack = require("./Jetpack");

describe('Jetpack entity constructor', () => {
    test('should return an empty jetpack when null values set', () => {
        jetpack = new Jetpack();
        expect(jetpack.id).toBeNull();
        expect(jetpack.name).toBeNull();
        expect(jetpack.image).toBeNull();
    });

    test('should set correct properties to jetpack', () => {
        jetpack = new Jetpack();
        expect(jetpack.id).toBeNull();
        expect(jetpack.name).toBeNull();
        expect(jetpack.image).toBeNull();

        jetpack.id = '0123456789';
        jetpack.name = 'Test Name';
        jetpack.image = 'http://my.test.url/img.jpg';
        expect(jetpack.id).toBe('0123456789');
        expect(jetpack.name).toBe('Test Name');
        expect(jetpack.image).toBe('http://my.test.url/img.jpg');
    });
});
