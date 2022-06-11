import {  useRef } from "react";
import SplitPane, { Pane } from "react-split-pane";
import BrowserMenu from "../browser";
import FooterUI from "../footer";

function Main() {
  const firstrow = useRef(null);

  async function Minimize() {
    firstrow.current.pane1.style.height >= '80%' && firstrow.current.pane1.style.height != 'calc(100% - 35px)' 
    ? firstrow.current.pane1.style.height = 'calc(100% - 35px)'
    : firstrow.current.pane1.style.height = '80%';
    const maximizes = document.getElementsByClassName('maximize');
    for(let i = 0; i <= maximizes.length; i++)
      maximizes[0].classList.remove('maximize');
    
  }

  return (
    <SplitPane
      ref={firstrow}
      split="horizontal"
      minSize={"80%"}
      defaultSize={
        localStorage.getItem("allhorizontal")
          ? parseInt(localStorage.getItem("allhorizontal"), 10)
          : "80%"
      }
      onChange={(size) => localStorage.setItem("allhorizontal", size)}
    >
      <SplitPane
        split="vertical"
        minSize={"15%"}
        defaultSize={
          localStorage.getItem("verticalsize")
            ? parseInt(localStorage.getItem("verticalsize"), 10)
            : "15%"
        }
        onChange={(size) => localStorage.setItem("verticalsize", size)}
      >
        <Pane className={"pane text-start overflow-auto"} initialSize="5%">
          <BrowserMenu />
        </Pane>
        <Pane className={"pane"}>
          fri
        </Pane>
      </SplitPane>
      <Pane className={"pane"}>
        <FooterUI minimize={ Minimize }/>
      </Pane>
    </SplitPane>
  );
 
  
  
}

export default Main;
