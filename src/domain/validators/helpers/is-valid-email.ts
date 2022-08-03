export const isValidEmail = (value: string, maxSize: number): boolean => {
  if (value.length > maxSize) return false;

  const tester = /^([a-zA-Z0-9]+[.|\-|_]?)*[a-zA-Z0-9]\@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;

  return tester.test(value);
};
