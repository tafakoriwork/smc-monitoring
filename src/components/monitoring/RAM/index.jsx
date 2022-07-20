import Window from "../../tools/window";
import Available from "./Available";
import Total from "./Total";
import Used from "./Used";

function RAM() {
    return (<>
    <Window body_ui={<Available/>} title={"available"} />
    <Window body_ui={<Total />} title={"total"} />
    <Window body_ui={<Used />} title={"used"} />
    </>);
}

export default RAM;