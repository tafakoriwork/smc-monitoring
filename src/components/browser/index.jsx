import TreeMenu from "../tools/TreeMenu";
import { useDispatch, useSelector } from "react-redux";
import { currentPanel, setSelectedBrowser } from "../redux/routingSlice";
import { useState } from "react";
import Collapser from "./collapser";
import Toggler from "./toggler";
import data from "../config/data";

function BrowserMenu(props) {
  const { toggle_browser, width } = props;
  const current = useSelector(currentPanel);
  const [selectorType, setselectorType] = useState("Physical");
  async function setSelector(type) {
    setselectorType(type);
  }
  const dispatch = useDispatch();
  async function setSelectedItem(item) {
    dispatch(setSelectedBrowser(item))
  }
  return (
    <div className="h-100">
      <Toggler selector_type={selectorType} setselector_type={setSelector} />
      {selectorType === "Physical" ? (
        <TreeMenu data={data.physicaldata} current={current} setSelected={setSelectedItem} />
      ) : (
        <TreeMenu data={data.logicaldata} current={current} setSelected={setSelectedItem} />
      )}
      <Collapser toggle_browser={toggle_browser} width={width} />
    </div>
  );
}

export default BrowserMenu;
