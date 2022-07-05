import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { nodeIp, setSelectedBrowser } from "../redux/routingSlice";
import CPU from "./CPU";
import OS from "../phyisical/OS";
import Service from "../services/Service";
import Hardwares from "../phyisical/Hardwares";
import HDD from "./HDD";
import HDDs from "../phyisical/HDDs";
import CPUs from "../phyisical/CPUs";
import NICs from "../phyisical/NICs";
import NIC from "./NIC";
import CORE from "./CORE";
function Monitoring(props) {
  const dispatch = useDispatch();
  const isCurrent = (tab) => props.current_tab.type === tab;
  const isCurrentTitle = (tab) => props.current_tab.title === tab;
  const nodes = props.current_tab;
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
            {props.current_tab.title && (
              <FontAwesomeIcon
                icon={faChevronRight}
                size={"xs"}
                style={{ color: "#999" }}
              />
            )}{" "}
            {props.current_tab.title}
          </h5>
        </div>
      {/* <div className="row tabbar" style={{ height: "36px" }}>
          { nodes?.children ? nodes.children?.map((el, i) => (
            <div
            key={i}
            className={isCurrentTitle(el.title) ? "col tab activeTab" : "col tab"}
            onClick={() => dispatch(setSelectedBrowser(el))}
          >
            {el.title}
          </div>
          )) : (<center>{props.current_tab.title}</center>)}
        </div>
      */} 
      </div>
      <div
        className="row px-4 overflow-auto h-100"
        style={{ paddingBottom: "270px" }}
      >
        {isCurrent("CORE") && <CORE />}
        {isCurrent("CPU") && <CPU />}
        {isCurrent("CPUS") && <CPUs />}
        {isCurrent("HDD") && <HDD />}
        {isCurrent("HDDS") && <HDDs />}
        {isCurrent("OS") && <OS />}
        {isCurrent("SERVICES") && <Service />}
        {isCurrent("HARDWARES") && <Hardwares />}
        {isCurrent("NICS") && <NICs />}
        {isCurrent("NIC") && <NIC />}
      </div>
    </div>
  );
}

export default Monitoring;
