import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Maximize from "../tools/Maximize";
import Tasks from "./tasks";
import Events from "./events";
import SplitPane, { Pane } from "react-split-pane";
function FooterUI(props) {
  const footer = useRef(null);
  const [currentTab, setCurrentTab] = useState("tasks");
  return (
    <SplitPane ref={ footer } defaultSize={
      localStorage.getItem("footersize")
        ? parseInt(localStorage.getItem("footersize"), 10)
        : "15%"
    }
    onChange={(size) => localStorage.setItem("footersize", size)}>
      <Pane className={"pane"}>
        <Tasks />
      </Pane>
      <Pane className={"pane"}>
        <Events />
      </Pane>
    </SplitPane>
  );
}

export default FooterUI;
