import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FilterModalSub(props) {
  const { setFilterSub, filters, close, setSelectAll } = props;
  const slctAll = (e) => {
    setSelectAll(e.target.checked);
  }
  return (
    <div className="bg-light filter_modal py-4 " style={{ width: "200px" }}>
      <span className="text-secondary me-auto position-absolute" style={{fontSize: '13px', top: '5px', left: '5px'}}>
          Sub:
        </span>
        <FontAwesomeIcon onClick={() => close()} icon={faTimes} color={"#555"} size={"xs"} className={"position-absolute c-pointer"} style={{ top: '10px', right: '10px'}}/>
      <div className="row flex-column ms-3 border-left mt-2">
        
      <div className="row justify-content-between align-items-center mx-0">
        <label
          htmlFor="selectall"
          style={{ fontSize: "12px" }}
          className="col-10 text-444 text-start"
        >
          Select all
        </label>
        <input
            type="checkbox"
            className="col input-check"
            id="selectall"
            checked={filters.sub.join('') == ['dead', 'exited', 'running'].join('') && true}
            onChange={slctAll}
          />
          </div>
        <div className="row justify-content-between align-items-center mx-0">
          <label
            htmlFor="running"
            style={{ fontSize: "12px" }}
            className="col-10 text-444 text-start ps-4"
          >
            running
          </label>
          <input
            checked={filters.sub.includes("running") && true}
            type="checkbox"
            className="col input-check "
            id="running"
            onChange={() => setFilterSub("running")}
          />
        </div>
        <div className="row justify-content-between align-items-center mx-0">
          <label
            htmlFor="exited"
            style={{ fontSize: "12px" }}
            className="col-10 text-444 text-start ps-4"
          >
            exited
          </label>
          <input
            checked={filters.sub.includes("exited") && true}
            type="checkbox"
            className="col input-check "
            id="exited"
            onChange={() => setFilterSub("exited")}
          />
        </div>
        <div className="row justify-content-between align-items-center mx-0">
          <label
            htmlFor="inactive"
            style={{ fontSize: "12px" }}
            className="col-10 text-444 text-start ps-4"
          >
            dead
          </label>
          <input
            checked={filters.sub.includes("dead") && true}
            type="checkbox"
            id="dead"
            className="col input-check"
            onChange={() => setFilterSub("dead")}
          />
        </div>
      </div>
    </div>
  );
}
export default FilterModalSub;

