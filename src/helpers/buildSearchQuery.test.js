import buildSearchQuery from './buildSearchQuery';

describe('buildSearchQuery', () => {
    const testData = {
        name: 'Goblin',   nameExact: false,
        oracle: 'haste',  oracleExact: false,
        flavor: 'fire',   flavorExact: false,
        pow: '>=', powAmt: '3',
        tou: '>=', touAmt: '2',
        loy: '>=', loyAmt: '1',
        cmc: '>=', cmcAmt: '2',
        game: 'paper',
        };

    it('should build a search query based on form data', () => {

        const formData = testData;
        const result = buildSearchQuery(formData);

        // Assert the generated search query
        expect(result).toBe(
        'Goblin (oracle:haste) (flavor:fire) (pow>=3) (tou>=2) (loy>=1) (cmc>=2) (game:paper)'
        );
    });


    it('should handle exact matches correctly', () => {
        const formData = {
            ...testData,
            nameExact: true,
            oracleExact: true,
            flavorExact: true,
        };

        const result = buildSearchQuery(formData);

        // Assert the generated search query for exact matches
        expect(result).toBe(
        '"Goblin" (oracle:"haste") (flavor:"fire") (pow>=3) (tou>=2) (loy>=1) (cmc>=2) (game:paper)'
        );
    });

    it('should handle a minimal/empty search', () => {
        const formData = {
            ...testData,
            name: '',
            oracle: '',
            flavor: '',
            powAmt: '', touAmt: '',
            loyAmt: '', cmcAmt: '',
        };

        const result = buildSearchQuery(formData);

        // Assert the generated search query for exact matches
        expect(result).toBe( '(game:paper)' );
    });


});
