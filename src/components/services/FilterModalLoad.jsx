import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FilterModalLoad(props) {
  const { setFilterLoad, filters, close, setSelectAll } = props;
  const slctAll = (e) => {
    setSelectAll(e.target.checked);
  };
  return (
    <div className="bg-light filter_modal py-4 " style={{ width: "200px" }}>
      <span
        className="text-secondary me-auto position-absolute"
        style={{ fontSize: "13px", top: "5px", left: "5px" }}
      >
        Load:
      </span>
      <FontAwesomeIcon
        onClick={() => close()}
        icon={faTimes}
        color={"#555"}
        size={"xs"}
        className={"position-absolute c-pointer"}
        style={{ top: "10px", right: "10px" }}
      />
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
            className="col input-check "
            id="selectall"
            checked={
              filters.load.join("") == ["not-found", "loaded"].join("") && true
            }
            onChange={slctAll}
          />
        </div>
        <div className="row justify-content-between align-items-center mx-0">
          <label
            htmlFor="not-found"
            style={{ fontSize: "12px" }}
            className="col-10 text-444 text-start ps-4"
          >
            not-found
          </label>
          <input
            checked={filters.load.includes("not-found") && true}
            type="checkbox"
            className="col input-check "
            id="not-found"
            onChange={() => setFilterLoad("not-found")}
          />
        </div>
        <div className="row justify-content-between align-items-center mx-0">
          <label
            htmlFor="loaded"
            style={{ fontSize: "12px" }}
            className="col-10 text-444 text-start ps-4"
          >
            loaded
          </label>
          <input
            checked={filters.load.includes("loaded") && true}
            type="checkbox"
            id="loaded"
            className="col input-check"
            onChange={() => setFilterLoad("loaded")}
          />
        </div>
      </div>
    </div>
  );
}
export default FilterModalLoad;
