import { useRef } from "react";
import SplitPane, { Pane } from "react-split-pane";
import BrowserMenu from "../browser";
import FooterUI from "../footer";
import Navbar from "../navbar";
import Monitoring from "../monitoring";
import { useSelector } from "react-redux";
import { currentPanel, ManagementCurrentPanel, MonitoringCurrentPanel } from "../redux/routingSlice";
import Management from "../management";

function Main() {
  const currentManagementTab = useSelector(currentPanel);
  const currentTab = useSelector(MonitoringCurrentPanel);
  const firstrow = useRef(null);

  async function Minimize() {
    firstrow.current.pane1.style.height >= "80%" &&
    firstrow.current.pane1.style.height !== "calc(100% - 35px)"
      ? (firstrow.current.pane1.style.height = "calc(100% - 35px)")
      : (firstrow.current.pane1.style.height = "80%");
    const maximizes = document.getElementsByClassName("maximize");
    for (let i = 0; i <= maximizes.length; i++)
      maximizes[0].classList.remove("maximize");
  }

  return (
    <div>
      <Navbar />
      <SplitPane
        ref={firstrow}
        style={{ marginTop: "60px" }}
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
          split="vertical"
          minSize={"13%"}
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
          <SplitPane
            split="vertical"
            defaultSize={
              localStorage.getItem("insideSize")
                ? parseInt(localStorage.getItem("insideSize"), 10)
                : "15%"
            }
            onChange={(size) => localStorage.setItem("insideSize", size)}
          >
            <Pane className={"pane h-100 overflow-auto"}>
              <Monitoring current_tab={useSelector(MonitoringCurrentPanel)} />
            </Pane>
            <Pane className={"pane h-100 overflow-auto"}>
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
