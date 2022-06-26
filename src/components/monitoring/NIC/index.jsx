import Window from "../../tools/window";
import { useSelector } from "react-redux";
import { apiUrl } from "../../redux/routingSlice";
import __Metric from "./metric";
import CRBUI from "./currentReceivedBandwidth";
import CSBUI from "./currentSentBandwidth";
import TSBUI from "./totalSentBandwidth";
import TRBUI from "./totalReceivedBandwidth";
function NIC() {
    const APIUrl = useSelector(apiUrl);
    return (<>
    <Window body_ui={<__Metric/>} title={"metric"} />
    <Window body_ui={<CRBUI/>} title={"current received bandwidth"} />
    <Window body_ui={<CSBUI/>} title={"current sent bandwidth"} />
    <Window body_ui={<TRBUI/>} title={"total received bandwidth"} />
    <Window body_ui={<TSBUI/>} title={"total sent bandwidth"} />
    </>);
}

export default NIC;