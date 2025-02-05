import "./App.css";
import { shutdown, sleep } from "./utils/power_manage_fns";
import { useRef, useState } from "react";

function App() {

  type Time = {
    hours: null | number;
    minutes: null | number;
    seconds: null | number;
  }

  const [count, setCount] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [inputValue, setInputValue] = useState<Time>({hours: null, minutes: null, seconds: null})
  const abortId = useRef({fnTimeoutId: 0, timerIntervalId: 0})

  const handleManageClick = async(fn: (time: number) => Promise<number>) => {
      const sec = inputValue.minutes! * 60_000 + inputValue.seconds! * 1_000
      setCount(inputValue.seconds! + inputValue.minutes! * 60)
      setIsDisabled(!isDisabled)
      abortId.current.fnTimeoutId = await fn(sec)
      abortId.current.timerIntervalId = setInterval(() => setCount(prev => prev - 1), 1000)
      setTimeout(() => setIsDisabled(false), sec)
  }

  const handleAbortClick = (fnTimeoutId: number, timerIntervalId: number) => {
      clearTimeout(fnTimeoutId)
      clearInterval(timerIntervalId)
      setIsDisabled(prev => !prev ? prev : !prev)
      setCount(0)

  }

  // function onSubmit(event: React.FormEvent) {
  //   event.preventDefault()
  //   const formData = new FormData(event.target as HTMLFormElement)
  
  //   const minutes = formData.get('minutes') as unknown as number
  //   const seconds = formData.get('seconds') as unknown as number 
  //   const time = minutes * 1_000_000 + seconds * 1_000
  //   setCount(seconds)

  //   setInterval(() => setCount(prev => prev - 1), 1000)
    
  // }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      {count > 0 && <h2>{count}</h2>}
      <form >
        <label htmlFor="minutes">Minutes</label>
        <input 
          type="text" 
          name='minutes' 
          value={inputValue.minutes as number} 
          onChange={(e) => setInputValue({...inputValue, minutes: Number(e.target.value) })}
        />
        <label htmlFor="seconds">Seconds</label>
        <input 
          type="text" 
          name='seconds' 
          value={inputValue.seconds as number} 
          onChange={(e) => setInputValue({...inputValue, seconds: Number(e.target.value)})}
        />
      </form>
      <button 
        disabled={isDisabled} 
        style={{cursor: isDisabled ? 'not-allowed' : 'auto', backgroundColor: isDisabled ? 'gray' : 'red'}}
        onClick={() => handleManageClick(sleep)}>
          sleep
      </button>
      <button 
        disabled={isDisabled} 
        style={{cursor: isDisabled ? 'not-allowed' : 'auto', backgroundColor: isDisabled ? 'gray' : 'red'}}
        onClick={() => handleManageClick(shutdown)}>
          shutdown
      </button>
      <button onClick={() => handleAbortClick(abortId.current.fnTimeoutId, abortId.current.timerIntervalId)}>Abort</button>
    </main>
  );
}

export default App;
