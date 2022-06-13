import Window from "../../tools/window";
import VChart from "./cpuChart";

function CPU() {
  return (
    <>
      <Window body_ui={<VChart />} title={"first chart"} />
      <Window body_ui={<span>second</span>} title={"22222"} />
      <Window body_ui={<span>second</span>} title={"22322"} />
      <Window body_ui={<span>second</span>} title={"2222"} />
      <Window body_ui={<span>second</span>} title={"225422"} />
      <Window body_ui={<span>second</span>} title={"2622"} />
      <Window body_ui={<span>second</span>} title={"22722"} />
      <Window body_ui={<span>second</span>} title={"227022"} />
      <Window body_ui={<span>second</span>} title={"228922"} />
    </>
  );
}

export default CPU;
