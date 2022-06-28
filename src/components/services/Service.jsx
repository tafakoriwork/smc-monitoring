
import Window from "../tools/window";
import ServiceDetails from "./ServiceDetails";
import Services from "./Services";
function Service() {
    return (<>
        <Window body_ui={<Services />} title={"Services"} />
        <Window body_ui={<ServiceDetails />} title={"Service"} />
        </>);
}

export default Service;