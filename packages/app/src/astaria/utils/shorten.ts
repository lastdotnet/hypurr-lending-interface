const MAX_LENGTH = 20;
const CHARACTERS_TO_SHOW_SHORT = 4;

export const shorten = ({
  maxLength = MAX_LENGTH,
  value,
  veryShort,
}: {
  maxLength?: number;
  value?: string;
  veryShort?: 'end' | 'start';
}) => {
  if (!value) {
    return '';
  }

  if (value.length > maxLength) {
    const endShort = value.slice(-CHARACTERS_TO_SHOW_SHORT);
    const startShort = value.slice(0, CHARACTERS_TO_SHOW_SHORT);
    if (veryShort === 'end') {
      return `…${endShort}`;
    }
    if (veryShort === 'start') {
      return `${startShort}…`;
    }

    return `${startShort}…${endShort}`;
  }

  return value;
};
