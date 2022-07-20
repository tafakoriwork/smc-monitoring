import Window from "../../tools/window";
import Available from "./Available";
import Used from "./Used";

function LUN() {
    return (<>
    <Window body_ui={<Available/>} title={"available"} />
    <Window body_ui={<Used />} title={"used"} />
    </>);
}

export default LUN;