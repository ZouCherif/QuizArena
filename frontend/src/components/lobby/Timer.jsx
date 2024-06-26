import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

function Timer() {
  const { admin } = useAuth();
  const [timer, setTimer] = useState(120);
  const [timerColor, setTimerColor] = useState("white");
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 10) {
          setTimerColor("red");
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTimer = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return admin ? (
    <div>
      <p className="text-center">Le quiz commence aprés:</p>
      <p
        className={`text-6xl text-center ${
          timerColor === "red" ? "text-red-700 animate-pulse" : ""
        } font-semibold`}
      >
        {formattedTimer}
      </p>
    </div>
  ) : null;
}

export default Timer;
