import React, { useState, useLayoutEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const duration = 600;

const timerProps = {
  isPlaying: true,
  size: 40,
  strokeWidth: 3,
};

export default function MyCountdownCircleTimer(props) {
  const [seconds, setSeconds] = useState(props.seconds);

  useLayoutEffect(() => {
    setSeconds(props.seconds);
  }, [props]);

  const display = (seconds = 600, elapsedTime) => {
    const s = seconds - elapsedTime / 1000;
    const format = (val) => `0${Math.floor(val)}`.slice(-2);
    const minutes = (s % 3600) / 60;
    return [minutes, s % 60].map(format).join(":");
  };

  const handleTimeOver = () => {
    alert("Time is over");
    window.location.href = "/vote";
  };

  const renderTime = (time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
      </div>
    );
  };
  return props.seconds ? (
    <CountdownCircleTimer
      {...timerProps}
      isPlaying
      duration={duration}
      colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
      initialRemainingTime={seconds}
      onComplete={handleTimeOver}
    >
      {({ elapsedTime }) => renderTime(display(seconds, elapsedTime))}
    </CountdownCircleTimer>
  ) : null;
}
