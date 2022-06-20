import TreeMenu from "../tools/TreeMenu";
import { useSelector } from "react-redux";
import { currentPanel } from "../redux/routingSlice";
import { useState } from "react";
import Collapser from "./collapser";
import Toggler from "./toggler";
import global from "../config/global";

function BrowserMenu(props) {
  const { toggle_browser, width } = props;
  const current = useSelector(currentPanel);
  const [selectorType, setselectorType] = useState("Physical");
  async function setSelector(type) {
    setselectorType(type);
  }
  /* physical */
  const physicaldata = [
    {
      method: "setPanel",
    },
    {
      id: "cluster1",
      title: "CLUSTER1",
      children: [
        {
          method: "setNodeIP",
        },
        {
          id: "node1",
          title: "Node1",
          ip: `${global.nodeIp}.41`,
          children: [
            { method: "setMonitoringPanelTab" },
            { id: "node1-CPU", title: "CPU" },
          ],
        },
        {
          id: "node2",
          title: "Node2",
          ip: `${global.nodeIp}.42`,
          children: [
            { method: "setMonitoringPanelTab" },
            { id: "node2-CPU", title: "CPU" },
          ],
        },
        {
          id: "node3",
          title: "Node3",
          ip: `${global.nodeIp}.43`,
          children: [
            { mehtod: "setMonitoringPanelTab" },
            { id: "node3-CPU", title: "CPU" },
          ],
        },
        {
          id: "node4",
          title: "Node4",
          ip: `${global.nodeIp}.44`,
          children: [
            { method: "setMonitoringPanelTab" },
            { id: "node4-CPU", title: "CPU" },
          ],
        },
        {
          id: "node5",
          title: "Node5",
          ip: `${global.nodeIp}.45`,
          children: [
            { method: "setMonitoringPanelTab" },
            { id: "node5-CPU", title: "CPU" },
          ],
        },
        {
          id: "node6",
          title: "Node6",
          ip: `${global.nodeIp}.46`,
          children: [
            { mehtod: "setMonitoringPanelTab" },
            { id: "node6-CPU", title: "CPU" },
          ],
        },
        {
          id: "node7",
          title: "Node7",
          ip: `${global.nodeIp}.48`,
          children: [
            { method: "setMonitoringPanelTab" },
            { id: "node7-CPU", title: "CPU" },
          ],
        },
        {
          id: "node8",
          title: "Node8",
          ip: `${global.nodeIp}.49`,
          children: [
            { mehtod: "setMonitoringPanelTab" },
            { id: "node8-CPU", title: "CPU" },
          ],
        },
      ],
    },
  ];
  /* logical */
  const logicaldata = [
    {
      method: "setPanel",
    },
    {
      id: "CLUSTER",
      children: [
        {
          method: "setMonitoringPanelTab",
        },
        { id: "CPU" },
        { id: "RAM" },
      ],
    },
    {
      id: "Management",
      children: [
        {
          method: "setManagementPanelTab",
        },
        { id: "Setting" },
        { id: "Setting2" },
      ],
    },
  ];
  return (
    <div className="h-100">
      <Toggler selector_type={selectorType} setselector_type={setSelector} />
      {selectorType === "Physical" ? (
        <TreeMenu data={physicaldata} current={current} />
      ) : (
        <TreeMenu data={logicaldata} current={current} />
      )}
      <Collapser toggle_browser={toggle_browser} width={width} />
    </div>
  );
}

export default BrowserMenu;
