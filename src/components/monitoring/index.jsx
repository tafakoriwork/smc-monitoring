import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nodeIp, setSelectedBrowser } from "../redux/routingSlice";
import CPU from "./CPU";
import RAM from "./RAM";
import NIDs from "./NIDs";
function Monitoring(props) {
  const dispatch = useDispatch();
  const isCurrent = (tab) => props.current_tab.title === tab;
  const nodes =props.current_tab;
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
        <div className="row tabbar" style={{ height: "36px" }}>
          { nodes?.children ? nodes.children?.map((el, i) => (
            <div
            key={i}
            className={isCurrent(el.title) ? "col tab activeTab" : "col tab"}
            onClick={() => dispatch(setSelectedBrowser(el))}
          >
            {el.title}
          </div>
          )) : (<center>{props.current_tab.title}</center>)}
        </div>
      </div>

      <div
        className="row px-4 overflow-auto h-100"
        style={{ paddingBottom: "70px" }}
      >
        {isCurrent("CPUs") && <CPU />}
        {isCurrent("HDDs") && <RAM />}
        {isCurrent("NICs") && <NIDs />}
      </div>
    </div>
  );
}

export default Monitoring;
