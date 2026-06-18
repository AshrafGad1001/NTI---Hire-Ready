const { calculator, getMessage, getUser } = require('./matchers');

describe('Matchers For Calculater', () => {
    test('Matchers Examples', () => {
        const result = calculator(2, 3);

        expect(result.sum).toBe(5); // toBe
        expect(result.sum).toBeGreaterThan(4); // toBeGreaterThan
        expect(result.sum).toBeLessThan(10); // toBeLessThan

        expect(result).toEqual({
            sum: 5,
            multiply: 6
        }); // toEqual

        expect([1, 2, 3]).toContain(2); // toContain

        expect('Hello Jest').toContain('Jest'); // toContain

        expect('Ashraf').toHaveLength(6); // toHaveLength

        expect(true).toBeTruthy(); // toBeTruthy

        expect(false).toBeFalsy(); // toBeFalsy

        expect(null).toBeNull(); // toBeNull

        let x;
        expect(x).toBeUndefined(); // toBeUndefined
    });
});

describe('Matchers For Message', () => {
    test('should match string', () => {
        const message = getMessage();

        expect(message).toMatch('Jest');
    });

    test('should match regex', () => {
        const message = getMessage();

        expect(message).toMatch(/Testing/);
    });
});

describe('Object Matchers For User', () => {

    // toEqual — full deep match
    test('toEqual: full object match', () => {
        const user = getUser();
        expect(user).toEqual({
            id: 1,
            name: 'Ashraf',
            age: 23,
            email: 'ashraf@gmail.com',
            address: {
                city: 'Shebin El-Kom',
                country: 'Egypt'
            },
            skills: ['JavaScript', 'React', 'Node.js']
        });
    });

    // toStrictEqual — نفس toEqual بس أصرم
    test('toStrictEqual: strict deep match', () => {
        const user = getUser();
        expect(user).toStrictEqual({
            id: 1,
            name: 'Ashraf',
            age: 23,
            email: 'ashraf@gmail.com',
            address: {
                city: 'Shebin El-Kom',
                country: 'Egypt'
            },
            skills: ['JavaScript', 'React', 'Node.js']
        });
    });

    // toMatchObject — partial match (مش محتاج كل الـ keys)
    test('toMatchObject: partial match', () => {
        const user = getUser();
        expect(user).toMatchObject({ name: 'Ashraf', age: 23 });
    });

    // toMatchObject — nested object partial match
    test('toMatchObject: nested partial match', () => {
        const user = getUser();
        expect(user).toMatchObject({
            address: { city: 'Shebin El-Kom' }
        });
    });

    // toHaveProperty — key exists
    test('toHaveProperty: key exists', () => {
        const user = getUser();
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('address');
    });

    // toHaveProperty — key + value
    test('toHaveProperty: key and value', () => {
        const user = getUser();
        expect(user).toHaveProperty('name', 'Ashraf');
        expect(user).toHaveProperty('id', 1);
    });

    // toHaveProperty — nested key بـ dot notation
    test('toHaveProperty: nested key dot notation', () => {
        const user = getUser();
        expect(user).toHaveProperty('address.city', 'Shebin El-Kom');
        expect(user).toHaveProperty('address.country', 'Egypt');
    });

    // expect.objectContaining — flexible partial inside toEqual
    test('objectContaining: flexible partial match', () => {
        const user = getUser();
        expect(user).toEqual(
            expect.objectContaining({ name: 'Ashraf', id: 1 })
        );
    });

    // toHaveProperty — array inside object
    test('toHaveProperty: array value check', () => {
        const user = getUser();
        expect(user).toHaveProperty('skills', ['JavaScript', 'React', 'Node.js']);
    });

    // toContain — item inside array in object
    test('toContain: item inside skills array', () => {
        const user = getUser();
        expect(user.skills).toContain('React');
    });

});



// Custom  Matcher

expect.extend({

    toHavePropertyOfType(received, key, type) {
        const value = received[key];
        const pass = typeof value === type;

        return {
            pass,
            message: () =>
                pass
                    ? `Expected "${key}" NOT to be of type "${type}"`
                    : `Expected "${key}" to be of type "${type}", but got "${typeof value}"`
        };
    },

    toHaveKeys(received, keys) {
        const missingKeys = keys.filter(key => !(key in received));
        const pass = missingKeys.length === 0;

        return {
            pass,
            message: () =>
                pass
                    ? `Expected object NOT to have keys: ${keys.join(', ')}`
                    : `Expected object to have keys: ${missingKeys.join(', ')}`
        };
    },

    toBeValidEmail(received) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pass = emailRegex.test(received.email);

        return {
            pass,
            message: () =>
                pass
                    ? `Expected "${received.email}" NOT to be a valid email`
                    : `Expected "${received.email}" to be a valid email`
        };
    }

});

describe('Custom Matchers For User', () => {

    test('toHavePropertyOfType: check property types', () => {
        const user = getUser();
        expect(user).toHavePropertyOfType('name', 'string');
        expect(user).toHavePropertyOfType('age', 'number');
        expect(user).toHavePropertyOfType('id', 'number');
        expect(user).toHavePropertyOfType('address', 'object');
    });

    test('toHaveKeys: user has all required keys', () => {
        const user = getUser();
        expect(user).toHaveKeys(['id', 'name', 'age', 'email', 'address', 'skills']);
    });

    test('toBeValidEmail: user email is valid', () => {
        const user = getUser();
        expect(user).toBeValidEmail();
    });

});