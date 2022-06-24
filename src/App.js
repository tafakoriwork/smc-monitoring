import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Main from "./components/main/main";
import { setWindowWidth } from "./components/redux/routingSlice";
function App() {
  const dispatch = useDispatch();
  function handelWindowSizeChange() {
    dispatch(setWindowWidth(window.innerWidth));
  }
  useEffect(() => {
    window.addEventListener("resize", handelWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handelWindowSizeChange);
    };
  }, []);
  return <div className="App"><Main /></div>;
}

export default App;
