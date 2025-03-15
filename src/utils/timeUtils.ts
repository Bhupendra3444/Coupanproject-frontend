
import { differenceInSeconds, formatDistance } from 'date-fns';

export const calculateTimeLeft = (targetDate: Date | string): { 
  total: number;
  minutes: number;
  seconds: number;
  formatted: string;
} => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  const difference = Math.max(0, differenceInSeconds(target, now));
  
  return {
    total: difference,
    minutes: Math.floor(difference / 60),
    seconds: difference % 60,
    formatted: formatDistance(now, target, { addSuffix: true })
  };
};

export const formatTimeLeft = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}m ${remainingSeconds}s`;
};
