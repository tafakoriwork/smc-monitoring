import Window from "../../tools/window";
import VChart from "./cpuChart";
import CPUSpeed from "./cpuSpeed";

function CPU() {
  return (
    <>
      <Window body_ui={<VChart />} title={"CPU usage"} />
     <Window body_ui={<CPUSpeed />} title={"CPU Current Speed"} /> 
    </>
  );
}

export default CPU;
