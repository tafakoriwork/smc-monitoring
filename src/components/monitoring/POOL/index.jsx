import Window from "../../tools/window";
import Details from "./Details";
import Available from "./Available";
import Used from "./Used";
import Total from "./Total";
import AvailablePercentage from "./AvailablePercentage";
import Maximum from "./Maximum";
import PoolSize from "./PoolSize";
import PoolMin from "./PoolMin";

function POOL() {
  return (
    <>
      <Window body_ui={<Available />} title={"availables"} />
      <Window body_ui={<AvailablePercentage />} title={"availables percentage"} />
      <Window body_ui={<Used />} title={"used"} />
      <Window body_ui={<Total />} title={"total"} />
      <Window body_ui={<Maximum />} title={"maximum"} />
      <Window body_ui={<PoolSize />} title={"pool min size"} />
      <Window body_ui={<PoolMin />} title={"pool min"} />
      <Window body_ui={<Details />} title={"details"} />
    </>
  );
}

export default POOL;
