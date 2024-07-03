import { preventNonNumericCharacters } from './utilFunctions';

describe('preventNonNumericCharacters', () => {
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    // Create a mock input element
    inputElement = document.createElement('input');
    inputElement.value = '';
  });

  it('should remove non-numeric characters from input value', () => {
    const event = new Event('input');
    spyOnProperty(event, 'target', 'get').and.returnValue(inputElement);

    inputElement.value = '123abc456';
    preventNonNumericCharacters(event);

    expect(inputElement.value).toEqual('123456');
  });

  it('should handle empty input value', () => {
    const event = new Event('input');
    spyOnProperty(event, 'target', 'get').and.returnValue(inputElement);

    inputElement.value = '';
    preventNonNumericCharacters(event);

    expect(inputElement.value).toEqual('');
  });

  it('should handle already sanitized input value', () => {
    const event = new Event('input');
    spyOnProperty(event, 'target', 'get').and.returnValue(inputElement);

    inputElement.value = '123456';
    preventNonNumericCharacters(event);

    expect(inputElement.value).toEqual('123456');
  });

  it('should handle input with mixed characters', () => {
    const event = new Event('input');
    spyOnProperty(event, 'target', 'get').and.returnValue(inputElement);

    inputElement.value = 'abc123def456ghi';
    preventNonNumericCharacters(event);

    expect(inputElement.value).toEqual('123456');
  });
});
