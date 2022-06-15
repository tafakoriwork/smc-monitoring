import { useRef } from "react";
import { useSelector } from "react-redux";
import SplitPane, { Pane } from "react-split-pane";
import BrowserMenu from "../browser";
import FooterUI from "../footer";
import Management from "../management";
import Monitoring from "../monitoring";
import Navbar from "../navbar";
import { currentPanel, currentPanelTab } from "../redux/routingSlice";
function MainMobile() {
  const current = useSelector(currentPanel);
  const currentTab = useSelector(currentPanelTab);
  const firstrow = useRef(null);
  async function Minimize() {
    firstrow.current.pane1.style.height >= "80%" &&
    firstrow.current.pane1.style.height !== "calc(100% - 35px)"
      ? (firstrow.current.pane1.style.height = "calc(100% - 35px)")
      : (firstrow.current.pane1.style.height = "80%");
    const maximizes = document.getElementsByClassName("maximize");
    for (let i = 0; i <= maximizes.length; i++)
      maximizes[0]?.classList.remove("maximize");
  }
  return (
    <>
      <Navbar />
      <SplitPane
      ref={firstrow}
        split="horizontal"
        style={{ marginTop: "80px" }}
        minSize={"80%"}
        defaultSize={
          localStorage.getItem("allhorizontalm")
            ? parseInt(localStorage.getItem("allhorizontalm"), 10)
            : "80%"
        }
        onChange={(size) => localStorage.getItem("allhorizontalm")}
      >
        <SplitPane split="horizontal" minSize={"50%"}>
          <Pane className={"pane"} initialSize="25%">
            <BrowserMenu />
          </Pane>
          <Pane className={"pane"}>
            {current} - {currentTab}
            {current === "Monitoring" && <Monitoring />}
            {current === "Management" && <Management />}
          </Pane>
        </SplitPane>
        <Pane className={"pane"}>
          <FooterUI minimize={Minimize} />
        </Pane>
      </SplitPane>
    </>
  );
}

export default MainMobile;
