const ONLY_TWO_WORDS = 2;

export const joinWithWord = (
  words: string[],
  word = 'and'
): string | undefined => {
  if (words && Array.isArray(words)) {
    if (words.length === ONLY_TWO_WORDS) {
      return words.join(` ${word} `);
    }
    if (words.length > ONLY_TWO_WORDS) {
      return `${words.slice(0, -1).join(', ')}, ${word} ${words.slice(-1)}`;
    }
    return words.at(0);
  }
  return words;
};
