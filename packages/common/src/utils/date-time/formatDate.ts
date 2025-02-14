import { format as dateFnsFormat } from 'date-fns';

type InitialFormat = 'simple' | 'timestamp' | 'ISO';

const getFormatByInitialFormat = (initialFormat: InitialFormat) => {
  if (initialFormat === 'simple') {
    return 'MMMM do, yyyy';
  }
  if (initialFormat === 'ISO') {
    return 'yyyy-MM-dd HH:mm';
  }
  return 'MMM-dd-yyyy hh:mm:ss a OOO';
};

export const formatDate = ({
  date,
  format: initialFormat = 'timestamp',
}: {
  date: number | string;
  format?: InitialFormat;
}) => dateFnsFormat(new Date(date), getFormatByInitialFormat(initialFormat));
