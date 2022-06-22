import { useRef, useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import BrowserMenu from "../browser";
import FooterUI from "../footer";
import Navbar from "../navbar";
import Monitoring from "../monitoring";
import { useSelector } from "react-redux";
import {
  ManagementCurrentPanel,
  selectedBrowser,
} from "../redux/routingSlice";
import Management from "../management";

function Main() {
  const firstrow = useRef(null);
  const browserRow = useRef(null);
  const selected_browser = useSelector(selectedBrowser);
  const [isCollapse, setIsCollapse] = useState(true);
  const [Width, setWidth] = useState(
    parseInt(localStorage.getItem("allhorizontal"), 10)
  );

  async function Minimize() {
    firstrow.current.pane1.style.height >= "80%" &&
    firstrow.current.pane1.style.height !== "calc(100% - 35px)"
      ? (firstrow.current.pane1.style.height = "calc(100% - 35px)")
      : (firstrow.current.pane1.style.height = "80%");
    const maximizes = document.getElementsByClassName("maximize");
    for (let i = 0; i <= maximizes.length; i++)
      maximizes[0]?.classList.remove("maximize");
  }

  async function toggleBrowser() {
    setIsCollapse(!isCollapse);
    browserRow.current.pane1.style.width = isCollapse ? "20px" : "200px";
    setWidth(parseInt(browserRow.current.pane1.style.width, 10));
  }

  return (
    <div>
      <Navbar />
      <SplitPane
        ref={firstrow}
        style={{ paddingTop: "60px"}}
        split="horizontal"
        minSize={"calc(80% - 60px)"}
        defaultSize={
          localStorage.getItem("allhorizontal")
            ? parseInt(localStorage.getItem("allhorizontal"), 10)
            : "calc(80% - 60px)"
        }
        onChange={(size) => localStorage.setItem("allhorizontal", size)}
      >
        <SplitPane
          ref={browserRow}
          split="vertical"
          defaultSize={
            localStorage.getItem("verticalsize")
              ? parseInt(localStorage.getItem("verticalsize"), 10)
              : "15%"
          }
          onChange={(size) => localStorage.setItem("verticalsize", size)}
        >
          <Pane
            ref={browserRow}
            className={"pane text-start"}
            style={{ position: "relative", height: "100%", overflowX: 'hidden' }}
            initialSize="5%"
          >
            <BrowserMenu width={Width} toggle_browser={toggleBrowser} />
          </Pane>
          <SplitPane
            split="vertical"
            className="overflow-hidden"
            defaultSize={
              localStorage.getItem("insideSize")
                ? parseInt(localStorage.getItem("insideSize"), 10)
                : "15%"
            }
            onChange={(size) => localStorage.setItem("insideSize", size)}
          >
            <Pane className={"pane overflow-hidden h-100"}>
              <Monitoring current_tab={selected_browser}/>
            </Pane>
            <Pane className={"pane overflow-hidden h-100"}>
              <Management current_tab={useSelector(ManagementCurrentPanel)} />
            </Pane>
          </SplitPane>
        </SplitPane>
        <FooterUI minimize={Minimize} />
      </SplitPane>
    </div>
  );
}

export default Main;
