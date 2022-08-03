// http://www.macoratti.net/alg_cpf.htm

const compareDocument = (value: number[], tester: number): boolean => {
  let multiplier = value.length + 1;
  let sum = 0;

  for (const number of value) {
    sum += number * multiplier--;
  }

  const verified = sum % 11 <= 1 ? 0 : 11 - (sum % 11);

  return verified === tester;
};

export const isValidDocument = (value: string): boolean => {
  const document = value
    .replace(/\D/g, '')
    .split('')
    .map(char => Number(char));

  if (document.length !== 11) return false;

  const isDifferent = document.some(number => number !== document[0]);

  if (!isDifferent) return false;

  const tester = document.slice(9, document.length);
  const body = document.slice(0, 9);

  const firstTesterIsValid = compareDocument(body, tester[0]);

  if (!firstTesterIsValid) return false;

  body.push(tester[0]);

  return compareDocument(body, tester[1]);
};
