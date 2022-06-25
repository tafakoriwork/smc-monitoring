import { useSelector } from "react-redux";
import { apiUrl } from "../redux/routingSlice";
import Window from "../tools/window";
function Service() {
    const APIUrl = useSelector(apiUrl);
    return (<>
        <Window body_ui={<span>{APIUrl}</span>} title={"Service"} />
        </>);
}

export default Service;