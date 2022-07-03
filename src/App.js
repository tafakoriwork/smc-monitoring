import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { token } from "./components/config/global";
import Main from "./components/main/main";
import { setWindowWidth } from "./components/redux/routingSlice";
import Login from "./components/user/login";
function App() {
  const dispatch = useDispatch();
  function handelWindowSizeChange() {
    dispatch(setWindowWidth(window.innerWidth));
  }
  useEffect(() => {
    handelWindowSizeChange();
    window.addEventListener("resize", handelWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handelWindowSizeChange);
    };
  }, []);
  return <div className="App">{token ? <Main /> : <Login/>}</div>;
}

export default App;
