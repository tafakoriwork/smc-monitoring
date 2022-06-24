import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  ManagementCurrentPanel,
  setManagementPanelTab,
} from "../redux/routingSlice";
import CreateUser from "./createUser";
import Setting from "./settting";

function Management(props) {
  const dispatch = useDispatch();
  const isCurrent = (tab) => current_component === tab;
  const current_component = useSelector(ManagementCurrentPanel);
  return (
    <div className="h-100 overflow-hidden">
      <div>
        <div className="row m-0 bg-light pt-1 align-items-center">
          <h5 style={{ fontSize: "12px", color: "#999" }}>
            {"Management"}
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
        <div className="row mx-0 tabbar" style={{ height: "36px" }}>
          <div
            className={
              isCurrent("CreateUser") ? "col tab activeTab" : "col tab"
            }
            onClick={() => dispatch(setManagementPanelTab("CreateUser"))}
          >
            Create User
          </div>
          <div
            className={isCurrent("Setting") ? "col tab activeTab" : "col tab"}
            onClick={() => dispatch(setManagementPanelTab("Setting"))}
          >
            Setting
          </div>
        </div>
      </div>
      <div className="row px-4 overflow-auto h-100">
        {isCurrent("CreateUser") && <CreateUser />}
        {isCurrent("Setting") && <Setting />}
      </div>
    </div>
  );
}

export default Management;
