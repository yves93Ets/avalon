import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SocketContext } from "../context";

const timerProps = {
  isPlaying: true,
  size: 40,
  strokeWidth: 3,
};

export default function MyCountdownCircleTimer(props) {
  const socket = useContext(SocketContext);
  const [seconds, setSeconds] = useState(props.seconds);
  const duration = 600;

  useLayoutEffect(() => {
    socket.on("time-over", () => {
      alert("Time is over");
    });
  }, [socket]);

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
    socket.emit("time-over");
  };

  const renderTime = (time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
      </div>
    );
  };
  return (
    <CountdownCircleTimer
      {...timerProps}
      isPlaying
      duration={duration}
      colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
      initialRemainingTime={seconds}
    >
      {({ elapsedTime }) => renderTime(display(seconds, elapsedTime))}
    </CountdownCircleTimer>
  );
}
