const { getProducts, getSkills } = require('./async');

describe('Async API Tests - DummyJSON Products', () => {

    test('should fetch all products', async () => {
        const data = await getProducts();

        expect(data).toHaveProperty('products');
        expect(data).toHaveProperty('total');
        expect(data).toHaveProperty('skip');
        expect(data).toHaveProperty('limit');

        expect(Array.isArray(data.products)).toBe(true);
        expect(data.products.length).toBeGreaterThan(0);
    });

    test('should every product have required keys', async () => {
        const data = await getProducts();
        const product = data.products[0];

        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('thumbnail');
    });

    test('should every product have correct types', async () => {
        const data = await getProducts();
        const product = data.products[0];

        expect(typeof product.id).toBe('number');
        expect(typeof product.title).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.category).toBe('string');
    });

});


    

describe('Array Matchers', () => {

    test('toContain: array contains item', () => {
        const skills = getSkills();
        expect(skills).toContain('React');
    });

    test('toHaveLength: array length', () => {
        const skills = getSkills();
        expect(skills).toHaveLength(5);
    });

    test('toEqual: full array match', () => {
        const skills = getSkills();
        expect(skills).toEqual(['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express']);
    });

    test('arrayContaining: partial array match', () => {
        const skills = getSkills();
        expect(skills).toEqual(
            expect.arrayContaining(['React', 'MongoDB'])
        );
    });

    test('toBeGreaterThan: array length greater than', () => {
        const skills = getSkills();
        expect(skills.length).toBeGreaterThan(3);
    });

    test('not toContain: array does not contain item', () => {
        const skills = getSkills();
        expect(skills).not.toContain('PHP');
    });

});