import { useState, useEffect, useRef } from "react";

function BarTimer({ alert }) {
  const [remainingTime, setRemainingTime] = useState(20);
  const intervalRef = useRef(null);
  const [timerColor, setTimerColor] = useState(3);

  useEffect(() => {
    setRemainingTime(20);
    setTimerColor(3);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [alert]);

  useEffect(() => {
    if (remainingTime <= 0) {
      clearInterval(intervalRef.current);
      setRemainingTime(0);
    }
    if (remainingTime === 10) {
      setTimerColor(2);
    }
    if (remainingTime === 5) {
      setTimerColor(1);
    }
  }, [remainingTime]);

  const barWidth = (remainingTime / 20) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full relative">
      <p className=" text-black text-4xl text-center absolute right-1/2 ">
        {remainingTime}
      </p>
      <div
        className={`h-10 ${
          timerColor === 3
            ? "bg-blue-500"
            : timerColor === 2
            ? "bg-orange-500"
            : "bg-red-700"
        } rounded-full`}
        style={{ width: `${barWidth}%` }}
      ></div>
    </div>
  );
}

export default BarTimer;
