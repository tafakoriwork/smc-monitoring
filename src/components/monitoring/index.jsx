import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch  } from "react-redux";
import { setMonitoringPanelTab } from "../redux/routingSlice";
import CPU from "./CPU";
import RAM from "./RAM";
function Monitoring(props) {
  const dispatch = useDispatch();
  const isCurrent = (tab) => props.current_tab === tab;
  return (
    <div>
      <div className="row m-0 bg-light pt-1 align-items-center">
        <h5 style={{ fontSize: "12px", color: "#999" }}>
          {"Monitoring"}
          {props.current_tab && (
            <FontAwesomeIcon
              icon={faChevronRight}
              size={"xs"}
              style={{ color: "#999" }}
            />
          )}{" "}
          {props.current_tab}
        </h5>
      </div>
      <div className="row tabbar" style={{ height: "36px" }}>
        <div
          className={isCurrent("CPU") ? "col tab activeTab" : "col tab"}
          onClick={() => dispatch(setMonitoringPanelTab("CPU"))}
        >
          CPU
        </div>
        <div
          className={isCurrent("RAM") ? "col tab activeTab" : "col tab"}
          onClick={() => dispatch(setMonitoringPanelTab("RAM"))}
        >
          RAM
        </div>
      </div>

      <div className="row h-100 px-4">
        {isCurrent("CPU") && <CPU />}
        {isCurrent("RAM") && <RAM />}
      </div>
    </div>
  );
}

export default Monitoring;
