import makeTitleCase from './makeTitleCase'; // Adjust the path accordingly

describe('makeTitleCase function', () => {
    test('should convert the first character to uppercase', () => {
      const result = makeTitleCase("mystring");

      expect(result).toEqual("Mystring");
    });

    test('should handle an empty string', () => {
        const result = makeTitleCase("");
    
        expect(result).toEqual("");
    });

    test('should handle a non-letter as the first character', () => {
        const result = makeTitleCase("1test");
    
        expect(result).toEqual("1test");
    });
});
