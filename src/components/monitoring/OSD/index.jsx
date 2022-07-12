import Window from "../../tools/window";
import Details from "./Details";
import Available from "./Available";
import Used from "./Used";
import Total from "./Total";

function OSD() {
  return (
    <>
      <Window body_ui={<Available />} title={"availables"} />
      <Window body_ui={<Used />} title={"used"} />
      <Window body_ui={<Total />} title={"total"} />
      <Window body_ui={<Details />} title={"details"} />
    </>
  );
}

export default OSD;
