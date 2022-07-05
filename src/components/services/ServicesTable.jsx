import {
  faChevronDown,
  faChevronUp,
  faFilter,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import FilterModalActive from "./FilterModalActive";
import FilterModalLoad from "./FilterModalLoad";
import FilterModalSub from "./FilterModalSub";

function ServicesTable(props) {
  const { services } = props;
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

  async function sortBy(type, state) {
    switch (true) {
      case type === "name":
        _services.sort((a, b) => {
          if (!state) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
          } else {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
          }
          return 0;
        });
        break;
      case type === "sub":
        _services.sort((a, b) => {
          if (!state) {
            if (a.sub < b.sub) return -1;
            if (a.sub > b.sub) return 1;
          } else {
            if (a.sub > b.sub) return -1;
            if (a.sub < b.sub) return 1;
          }
          return 0;
        });
        break;
      case type === "active":
        _services.sort((a, b) => {
          if (!state) {
            if (a.active < b.active) return -1;
            if (a.active > b.active) return 1;
          } else {
            if (a.active > b.active) return -1;
            if (a.active < b.active) return 1;
          }
          return 0;
        });
        break;
      case type === "load":
        _services.sort((a, b) => {
          if (!state) {
            if (a.load < b.load) return -1;
            if (a.load > b.load) return 1;
          } else {
            if (a.load > b.load) return -1;
            if (a.load < b.load) return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
  }

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
  const selectAllActive = async (state) => {
    if (state) setActiveFilters(["active", "inactive"]);
    else setActiveFilters([]);
  };
  /* select all filters Sub*/
  const selectAllSub = async (state) => {
    if (state) setSubFilters(["dead", "exited", "running"]);
    else setSubFilters([]);
  };
  /* select all filters Load*/
  const selectAllLoad = async (state) => {
    if (state) setLoadFilters(["not-found", "loaded"]);
    else setLoadFilters([]);
  };
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

  const resetFilter = () => {
    setActiveFilters([]);
    setSubFilters([]);
    setLoadFilters([]);
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
                  <FontAwesomeIcon icon={faFilter} size="xs" color="#aaa" />
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
                  <FontAwesomeIcon icon={faFilter} size="xs" color="#aaa" />
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
                  <FontAwesomeIcon icon={faFilter} size="xs" color="#aaa" />
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
                icon={filter_on ? faFilterCircleXmark : faFilter}
                className="position-absolute c-pointer"
                style={{ top: "5px", right: "10px" }}
                color={"#a96"}
                onClick={() => {
                  if (filter_on) {
                    setFilterOn(false);
                    resetFilter();
                  } else 
                    setFilterOn(1);
                }}
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
                <td className="border">{i + 1}</td>
                <td className="border">{el.name}</td>
                <td className="border">{el.sub}</td>
                <td className="border">{el.active}</td>
                <td className="border">{el.load}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default ServicesTable;
