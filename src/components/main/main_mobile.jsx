import SplitPane, { Pane } from "react-split-pane";
function MainMobile() {
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
        <SplitPane split="horizontal" minSize={"50%"}>
          <Pane className={"pane"} initialSize="25%">
            asd3
          </Pane>
          <Pane className={"pane"}>MOBILE</Pane>
        </SplitPane>
        <Pane className={"pane"}>footer</Pane>
      </SplitPane>
  );
}

export default MainMobile;
