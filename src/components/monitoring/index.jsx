import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPanelTab, setPanelTab } from "../redux/routingSlice";
import CPU from "./CPU";
import RAM from "./RAM";

function Monitoring() {
  const currentTab = useSelector(currentPanelTab);
  const dispatch = useDispatch();
  const isCurrent = (tab) => currentTab === tab;
  return (
    <div>
      <div className="row tabbar" style={{ height: "36px" }}>
        <div
          className={isCurrent("CPU") ? "col-md-1 col-3 tab activeTab" : "col-md-1 col-3 tab"}
          onClick={() => dispatch(setPanelTab("CPU"))}
        >
          CPU
        </div>
        <div
          className={isCurrent("RAM") ? "col-md-1 col-3 tab activeTab" : "col-md-1 col-3 tab"}
          onClick={() => dispatch(setPanelTab("RAM"))}
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
