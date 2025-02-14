import {
  milliseconds,
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
} from 'date-fns';

import { hoursToDays } from './hoursToDays';

const DAYS_CUTOFF = 3;

const formatDays = ({ days }: { days: number }) => `${days}d`;
const formatHours = ({ hours }: { hours: number }) => `${hours}h`;
const formatMinutes = ({ minutes }: { minutes: number }) => `${minutes}m`;
const formatSeconds = ({ seconds }: { seconds: number }) => `${seconds}s`;

export const getDurationFromMilliseconds = (duration: number) => {
  let total = duration;
  let days;
  let hours;
  let minutes;
  let seconds;

  if (total >= milliseconds({ days: 1 })) {
    days = hoursToDays(millisecondsToHours(total));
    total -= milliseconds({ days });
  }
  if (total >= milliseconds({ hours: 1 })) {
    hours = millisecondsToHours(total);
    total -= milliseconds({ hours });
  }
  if (total >= milliseconds({ minutes: 1 })) {
    minutes = millisecondsToMinutes(total);
    total -= milliseconds({ minutes });
  }
  if (total >= milliseconds({ seconds: 1 })) {
    seconds = millisecondsToSeconds(total);
  }

  return {
    ...(days ? { days } : {}),
    ...(hours ? { hours } : {}),
    ...(minutes ? { minutes } : {}),
    ...(seconds ? { seconds } : {}),
  };
};

const outputDuration = ({
  concise,
  duration,
}: {
  concise?: boolean;
  duration: {
    days?: number | undefined;
    hours?: number | undefined;
    minutes?: number | undefined;
    seconds?: number | undefined;
  };
}) => {
  const result: string[] = [];

  if (!duration.days) {
    if (duration.hours) {
      result.push(formatHours({ hours: duration.hours }));
    }
    if (duration.minutes && (!concise || (concise && !duration.hours))) {
      result.push(formatMinutes({ minutes: duration.minutes }));
    }
    if (
      duration.seconds &&
      duration.seconds > 0 &&
      (!concise || (concise && !duration.hours && !duration.minutes))
    ) {
      result.push(formatSeconds({ seconds: duration.seconds }));
    }
  } else if (duration.days >= 1 && duration.days < DAYS_CUTOFF) {
    if (duration.days) {
      result.push(formatDays({ days: duration.days }));
    }
    if (duration.hours && (!concise || (concise && !duration.days))) {
      result.push(formatHours({ hours: duration.hours }));
    }
  } else {
    if (duration.days) {
      result.push(formatDays({ days: duration.days }));
    }
  }

  if (result.length === 0) {
    return undefined;
  }

  return result.join(' ');
};

export const formatDuration = ({
  concise,
  milliseconds,
}: {
  concise?: boolean;
  milliseconds: number;
}) => {
  const duration = getDurationFromMilliseconds(milliseconds);

  return outputDuration({ concise, duration });
};
