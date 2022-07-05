import Window from "../../tools/window";
import COREChart from "./coreChart";
import CORESpeed from "./coreSpeed";
function CORE() {
  return (
    <>
      <Window body_ui={<COREChart />} title={"CORE usage"} />
      <Window body_ui={<CORESpeed />} title={"CORE Current Speed"} />
    </>
  );
}

export default CORE;
