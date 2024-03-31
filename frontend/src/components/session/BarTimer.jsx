import { useState, useEffect, useRef } from "react";

function BarTimer() {
  const [remainingTime, setRemainingTime] = useState(20);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      clearInterval(intervalRef.current);
    }
  }, [remainingTime]);

  const barWidth = (remainingTime / 20) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full relative">
      <p className=" text-black text-4xl text-center absolute right-1/2 ">
        {remainingTime}
      </p>
      <div
        className="h-10 bg-blue-500 rounded-full"
        style={{ width: `${barWidth}%` }}
      ></div>
    </div>
  );
}

export default BarTimer;
