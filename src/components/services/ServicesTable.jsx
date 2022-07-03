import {
  faChevronDown,
  faChevronUp,
  faFilter,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import FilterModalActive from "./FilterModalActive";
import FilterModalLoad from "./FilterModalLoad";
import FilterModalSub from "./FilterModalSub";

function ServicesTable(props) {
  const { services, sortBy } = props;
  let srvs = services;
  const [is_sub, setIssub] = useState(false);
  const [is_name, setIsname] = useState(false);
  const [is_active, setIsactive] = useState(false);
  const [is_load, setIsload] = useState(false);
  const [is_modal_open, setModalOpen] = useState(0);
  const [filter_on, setFilterOn] = useState(false);
  const [_services, setServices] = useState(services);
  const [SubFilters, setSubFilters] = useState([]);
  const [LoadFilters, setLoadFilters] = useState([]);
  const [ActiveFilters, setActiveFilters] = useState([]);
  const setFilterSub = async (item) => {
    if (SubFilters.includes(item)) {
      let filtersClone = [...SubFilters];
      const filter = (el) => {
        return el !== item;
      };
      filtersClone = filtersClone.filter(filter);
      setSubFilters(filtersClone);
    } else setSubFilters([...SubFilters, item]);
  };
  const setFilterLoad = async (item) => {
    if (LoadFilters.includes(item)) {
      let filtersClone = [...LoadFilters];
      const filter = (el) => {
        return el !== item;
      };
      filtersClone = filtersClone.filter(filter);
      setLoadFilters(filtersClone);
    } else setLoadFilters([...LoadFilters, item]);
  };
  /* select all filters Active*/
  const selectAllActive = async(state) => {
    if(state)
    setActiveFilters(['active', 'inactive']);
    else 
    setActiveFilters([]);
  }
  /* select all filters Sub*/
  const selectAllSub = async(state) => {
    if(state)
    setSubFilters(['dead', 'exited', 'running']);
    else 
    setSubFilters([]);
  }
  /* select all filters Load*/
  const selectAllLoad = async(state) => {
    console.log(state);
    if(state)
    setLoadFilters(['not-found', 'loaded']);
    else 
    setLoadFilters([]);
  }
  const setFilterActive = async (item) => {
    if (ActiveFilters.includes(item)) {
      let filtersClone = [...ActiveFilters];
      const filter = (el) => {
        return el !== item;
      };
      filtersClone = filtersClone.filter(filter);
      setActiveFilters(filtersClone);
    } else setActiveFilters([...ActiveFilters, item]);
  };
  const toggle = (type) => {
    if (type !== "name") setIsname(false);
    if (type !== "sub") setIssub(false);
    if (type !== "active") setIsactive(false);
    if (type !== "load") setIsload(false);
  };

  const closeModal = async () => {
    setModalOpen(0);
  };

  const checkFilter = () => {
    let keepServices = services;
    ActiveFilters.length &&
      (keepServices = keepServices.filter((el) =>
        ActiveFilters.includes(el.active)
      ));
    SubFilters.length &&
      (keepServices = keepServices.filter((el) => SubFilters.includes(el.sub)));
    LoadFilters.length &&
      (keepServices = keepServices.filter((el) =>
        LoadFilters.includes(el.load)
      ));

    setServices(keepServices);
  };

  useEffect(() => {
    checkFilter();
  }, [ActiveFilters, SubFilters, LoadFilters]);

  return (
    <>
      <table className="table" style={{ minHeight: "200px" }}>
        <thead>
          <tr>
            <th className="border">#</th>
            <th className="border position-relative">
              name
              <span className="px-2 c-pointer">
                <FontAwesomeIcon
                  size="xs"
                  icon={is_name ? faChevronDown : faChevronUp}
                  onClick={() => {
                    sortBy("name", is_name);
                    toggle("name");
                    setIsname((is_name) => (is_name = !is_name));
                  }}
                />
              </span>
            </th>
            <th className="border position-relative">
              {filter_on && (
                <div
                  className="position-absolute"
                  onClick={() =>
                    is_modal_open === 2 ? setModalOpen(0) : setModalOpen(2)
                  }
                >
                  <FontAwesomeIcon icon={faList} size="xs" color="#aaa" />
                </div>
              )}
              sub
              <span className="px-2 c-pointer">
                <FontAwesomeIcon
                  size="xs"
                  icon={is_sub ? faChevronDown : faChevronUp}
                  onClick={() => {
                    sortBy("sub", is_sub);
                    toggle("sub");
                    setIssub((is_sub) => (is_sub = !is_sub));
                  }}
                />
              </span>
              {is_modal_open === 2 && (
                <FilterModalSub
                  filters={{
                    sub: SubFilters,
                  }}
                  setFilterSub={setFilterSub}
                  close={closeModal}
                  setSelectAll={selectAllSub}
                />
              )}
            </th>
            <th className="border position-relative">
              {filter_on && (
                <div
                  className="position-absolute"
                  onClick={() =>
                    is_modal_open === 3 ? setModalOpen(0) : setModalOpen(3)
                  }
                >
                  <FontAwesomeIcon icon={faList} size="xs" color="#aaa" />
                </div>
              )}
              active
              <span className="px-2 c-pointer">
                <FontAwesomeIcon
                  size="xs"
                  icon={is_active ? faChevronDown : faChevronUp}
                  onClick={() => {
                    sortBy("active", is_active);
                    toggle("active");
                    setIsactive((is_active) => (is_active = !is_active));
                  }}
                />
              </span>
              {is_modal_open === 3 && (
                <FilterModalActive
                  filters={{
                    active: ActiveFilters,
                  }}
                  setFilterActive={setFilterActive}
                  setSelectAll={selectAllActive}
                  close={closeModal}
                />
              )}
            </th>
            <th className="border position-relative">
              {filter_on && (
                <div
                  className="position-absolute"
                  onClick={() =>
                    is_modal_open === 4 ? setModalOpen(0) : setModalOpen(4)
                  }
                >
                  <FontAwesomeIcon icon={faList} size="xs" color="#aaa" />
                </div>
              )}
              <div>
                load
                <span className="px-2 c-pointer">
                  <FontAwesomeIcon
                    size="xs"
                    icon={is_load ? faChevronDown : faChevronUp}
                    onClick={() => {
                      sortBy("load", is_load);
                      toggle("load");
                      setIsload((is_load) => (is_load = !is_load));
                    }}
                  />
                </span>
              </div>
              <FontAwesomeIcon
                icon={faFilter}
                className="position-absolute c-pointer"
                style={{ top: "5px", right: "10px" }}
                color={"#999"}
                onClick={() => setFilterOn(!filter_on)}
              />
              {is_modal_open === 4 && (
                <FilterModalLoad
                  filters={{
                    load: LoadFilters,
                  }}
                  setFilterLoad={setFilterLoad}
                  close={closeModal}
                  setSelectAll={selectAllLoad}
                />
              )}
            </th>
          </tr>
        </thead>
        {_services.map((el, i) => {
          return (
            <tbody key={i}>
              <tr className="border">
                <td className="border" width={"10%"}>
                  {i + 1}
                </td>
                <td className="border" width={"30%"}>
                  {el.name}
                </td>
                <td className="border" width={"20%"}>
                  {el.sub}
                </td>
                <td className="border" width={"20%"}>
                  {el.active}
                </td>
                <td className="border" width={"20%"}>
                  {el.load}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default ServicesTable;
