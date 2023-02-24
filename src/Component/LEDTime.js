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

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const date = new Date().toLocaleDateString('en-GB')
  return (
    <div className="led-time">
      <div className="led-digit">{hours[0]}</div>
      <div className="led-digit">{hours[1]}</div>
      <div className="led-separator">:</div>
      <div className="led-digit">{minutes[0]}</div>
      <div className="led-digit">{minutes[1]}</div>
      <div className="led-separator">:</div>
      <div className="led-digit">{seconds[0]}</div>
      <div className="led-digit">{seconds[1]}</div>
      <div className="led-separator">|</div>
      <div className="led-digit led-date">{date}</div>
    </div>
  );
}

export default LEDTime;