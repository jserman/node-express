suite('About Page Tests', () => {
    test('page should contact a link to contact page', () => {
        assert($('a[href="/concat"]').length);
    })
});