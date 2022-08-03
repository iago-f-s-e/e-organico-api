type Capitalize = (str: string) => string;

function execCapitalize(subStr: string): string {
  const isConector = subStr.length <= 2;

  if (isConector) return subStr.toLowerCase();

  const head = subStr[0].toUpperCase();
  const tail = subStr.slice(1).toLowerCase();

  return `${head}${tail}`;
}

export const capitalize: Capitalize = str =>
  str
    .split(' ')
    .map(subStr => execCapitalize(subStr))
    .join(' ');
