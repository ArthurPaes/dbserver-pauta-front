export function preventNonNumericCharacters(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  input.value = value;
}
