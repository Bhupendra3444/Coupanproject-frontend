
import React, { useState, useEffect } from 'react';
import { calculateTimeLeft, formatTimeLeft } from '@/utils/timeUtils';

interface CountdownTimerProps {
  targetDate: Date | string;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    if (timeLeft.total <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      const updated = calculateTimeLeft(targetDate);
      setTimeLeft(updated);
      
      if (updated.total <= 0) {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, timeLeft.total]);

  return (
    <div className="cooldown-timer mt-4 p-3 bg-yellow-100 rounded-md">
      <p className="text-yellow-800 mb-2">Next coupon available in:</p>
      <div className="timer text-xl font-mono">{formatTimeLeft(timeLeft.total)}</div>
    </div>
  );
};

export default CountdownTimer;
