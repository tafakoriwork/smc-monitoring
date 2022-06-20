import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { nodeIp, setMonitoringPanelTab } from "../redux/routingSlice";
import CPU from "./CPU";
import RAM from "./RAM";
function Monitoring(props) {
  const dispatch = useDispatch();
  const isCurrent = (tab) => props.current_tab === tab;
  const node_ip = useSelector(nodeIp);
  return (
    <div className="h-100 overflow-hidden">
      <div>
        <div className="row m-0 bg-light pt-1 align-items-center">
          <h5 style={{ fontSize: "12px", color: "#999" }}>
            {"Monitoring"}
            {" "}
            {props.current_node && (
              <FontAwesomeIcon
                icon={faChevronRight}
                size={"xs"}
                style={{ color: "#999" }}
              />
            )}{" "}
            {node_ip && (
              <FontAwesomeIcon
                icon={faChevronRight}
                size={"xs"}
                style={{ color: "#999" }}
              />
            )}{" "}
            {node_ip}
            {" "}
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
      </div>

      <div
        className="row px-4 overflow-auto h-100"
        style={{ paddingBottom: "70px" }}
      >
        {isCurrent("CPU") && <CPU />}
        {isCurrent("RAM") && <RAM />}
      </div>
    </div>
  );
}

export default Monitoring;
