import { useEffect, useState } from "react";
import Timer from './component/Timer';

function Counter() {
  const [count, setCount] = useState(1);
  
  const handleCounterUpdate = () => {
    setCount(count + 1);
  }

  //랜더링 될 때마다 실행
  /*
  useEffect(() => {
    console.log("랜더링 될 때마다 실행");
  })
  */

  //최초 랜더링 & count 값이 변화될 때만
  /*
  useEffect(() => {
    console.log("count 변화");
  },[count])
  */
  
  return (
    <div>
      <button onClick={handleCounterUpdate}>Update</button>
      <span>count : {count} </span>
    </div>
  )
}

function TextInput() {
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  //랜더링 될 때마다 실행
  /*
  useEffect(() => {
    console.log("랜더링 될 때마다 실행");
  })
  */
 
  //최초 랜더링 & name 값이 변화될 때만
  /*
  useEffect(() => {
    console.log("name 변화");
  },[name])
  */

  return (
    <div>
      <input type="text" value={name} onChange={handleInputChange} />
      <span>name : {name}</span>
    </div>

  )

}

function App() {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="App">
      <Counter></Counter>
      <TextInput></TextInput>
      <br/>
      {showTimer && <Timer />}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>


    </div>
  );
}

export default App;
