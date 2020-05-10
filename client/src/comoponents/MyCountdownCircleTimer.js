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
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    setSeconds(props.seconds);
    setVisible(props.visible);
  }, [props]);

  const display = (seconds = 600) => {
    const s = seconds;
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
  return (visible && seconds > 0) || seconds > 0 ? (
    <CountdownCircleTimer
      {...timerProps}
      isPlaying
      duration={duration}
      colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
      initialRemainingTime={seconds}
      onComplete={handleTimeOver}
    >
      {({ remainingTime }) => renderTime(display(remainingTime))}
    </CountdownCircleTimer>
  ) : null;
}
