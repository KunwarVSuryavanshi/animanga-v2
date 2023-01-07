import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import React, { useEffect, useState } from "react";
import { secondsToDhms } from "../../Common/utils";
import "./Timer.scss";

function Timer({ time }) {
  const [timeLeft, setTimeLeft] = useState(null);

  const startTimer = () => {
    let timer = time; // Why this? because you dont want to change props, that too directly and even if I use Setter, it defeats the purpose of creating separate component to minimize rendering.
    let ref = null;
    if (timer > 0) {
      ref = setInterval(() => {
        setTimeLeft(secondsToDhms(timer));
        timer--;
      }, 1000);
    } else {
      clearInterval(ref)
    }
  };

  useEffect(() => {
    if (time) {
      startTimer(time);
    }
  }, [time]);

  return (
    <div className="root_timer">
      <span className="header">Next<br/>Episode</span>
      {/* <AccessAlarmsIcon /> */}
      <span className="timer">
        <span className="day">
          <span>{timeLeft?.d ?? '0'}</span>
          <span>DAYS</span>
        </span>
        :
        <span className="hour">
          <span>{timeLeft?.h ?? '0'}</span>
          <span>HOURS</span>
        </span>
        :
        <span className="min">
          <span>{timeLeft?.m ?? '0'}</span>
          <span>MINS</span>
        </span>
        :
        <span className="second">
          <span>{timeLeft?.s ?? '0'}</span>
          <span>SECONDS</span>
          </span>
      </span>
    </div>
  );
}

export default Timer;
