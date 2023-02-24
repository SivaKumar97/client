import { useState, useEffect } from 'react';
import './LEDTime.css';

function LEDTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const date = new Date().toLocaleString('en-GB',{hour12: true})
  return (
    <div className="led-time">
      <div className="led-digit">{date}</div>
    </div>
  );
}

export default LEDTime;