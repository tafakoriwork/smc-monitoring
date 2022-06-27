import { useSelector } from "react-redux";
import { apiUrl } from "../redux/routingSlice";
import Window from "../tools/window";
import ServiceDetails from "./ServiceDetails";
function Service() {
    const APIUrl = useSelector(apiUrl);
    return (<>
        <Window body_ui={<ServiceDetails />} title={"Service"} />
        </>);
}

export default Service;