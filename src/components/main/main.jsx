import SplitPane, { Pane } from "react-split-pane";
import BrowserMenu from "../browser";
function Main() {
  return (
      <SplitPane
        split="horizontal"
        minSize={"80%"}
        defaultSize={
          localStorage.getItem("allhorizontal")
            ? parseInt(localStorage.getItem("allhorizontal"), 10)
            : "80%"
        }
        onChange={(size) => localStorage.getItem("allhorizontal")}
      >
        <SplitPane split="vertical" minSize={"15%"}>
          <Pane className={"pane text-start"} initialSize="25%">
            <BrowserMenu />
          </Pane>
          <Pane className={"pane"}>asd2</Pane>
        </SplitPane>
        <Pane className={"pane"}>footer</Pane>
      </SplitPane>
  );
}

export default Main;
