// Import the formatErrMsg helper function
import formatErrMsg from './formatErrMsg';

// Example test case
describe('formatErrMsg', () => {
  it('should replace instance keys in error messages with corresponding labels', () => {
    // Mock error messages
    const errorMsgs = [
      'Error in instance.deckName',
      'Another error in instance.format',
      'Yet another error in instance.description',
    ];

    // Labels to replace keys
    const replaceKeys = {
      'deckName': 'Name',
      'format': 'Format',
      'description': 'Description',
    };

    // Call the formatErrMsg helper
    formatErrMsg(errorMsgs, replaceKeys);

    // Assert that the instance keys are replaced with labels
    expect(errorMsgs).toEqual([
      'Error in Name',
      'Another error in Format',
      'Yet another error in Description',
    ]);
  });

  // Add more test cases as needed
});
