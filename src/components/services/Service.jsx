
import Window from "../tools/window";
import Services from "./Services";
import Active from "./Active";
import Sub from "./Sub";
import Load from "./Load";
function Service(props) {
    const {url} = props;
    return (<>
        <Window body_ui={<Services url={url}/>} title={"Services"} />
        <Window body_ui={<Active />} title={"Active"} />
        <Window body_ui={<Sub />} title={"Sub"} />
        <Window body_ui={<Load />} title={"Load"} />
        </>);
}

export default Service;