import Window from "../../tools/window";
import { useSelector } from "react-redux";
import { apiUrl } from "../../redux/routingSlice";
function NIC() {
    const APIUrl = useSelector(apiUrl);
    return (<>
    <Window body_ui={<span>{APIUrl}</span>} title={"NIC"} />
    </>);
}

export default NIC;