import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/main/main";
import MainMobile from "./components/main/main_mobile";
function App() {
  const [width, setwidth] = useState(window.innerWidth);
  function handelWindowSizeChange() {
    setwidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handelWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handelWindowSizeChange);
    };
  }, []);
  return (
    <div className="App">
     {width <= 768 ? <MainMobile /> : <Main />}
    </div>
  );
}

export default App;
