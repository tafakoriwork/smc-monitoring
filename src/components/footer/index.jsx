import { useRef } from "react";
import Tasks from "./tasks";
import Events from "./events";
import SplitPane, { Pane } from "react-split-pane";
import FooterNav from "./nav";
function FooterUI(props) {
  const { minimize } = props;
  const footer = useRef(null);
  return (
    <div ref={footer} className="footerComp">
      <FooterNav minimize={minimize} footer={footer}/>
      <SplitPane
        style={{ paddingTop: "30px" }}
        defaultSize={
          localStorage.getItem("footersize")
            ? parseInt(localStorage.getItem("footersize"), 10)
            : "15%"
        }
        onChange={(size) => localStorage.setItem("footersize", size)}
      >
        <Pane className={"pane"}>
          <Tasks />
        </Pane>
        <Pane className={"pane"}>
          <Events />
        </Pane>
      </SplitPane>
    </div>
  );
}

export default FooterUI;
