import Window from "../../tools/window";
import VChart from "./cpuChart";
import CPUSpeed from "./cpuSpeed";

function CPU() {
  return (
    <>
      <span>core 0 </span>
      <span>core 1 </span>
      <Window body_ui={<VChart />} title={"CPU usage"} />
      <Window body_ui={<CPUSpeed />} title={"CPU Current Speed"} />
    </>
  );
}

export default CPU;
