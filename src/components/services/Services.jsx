import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl, nodeIp } from "../redux/routingSlice";
import global from "../config/global";
import ServicesTable from "./ServicesTable";
import {
  setActives,
  setDead,
  setExited,
  setInactives,
  setLoaded,
  setNotFound,
  setRunning,
} from "../redux/serviceSlice";
import Loading from "../tools/Loading";

function Services(props) {
  const { url } = props;
  const APIUrl = useSelector(apiUrl);
  const nodeIP = useSelector(nodeIp);
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [keep_services, setKeepServices] = useState(null);
  function servicesRequest() {
    services.length === 0 &&
      axios
        .get(APIUrl, {
          headers: {
            username: global.username,
            password: global.password,
            address: nodeIP,
            Authorization: `Bearer ${global.token}`,
          },
        })
        .then((result) => result.data)
        .then((response) => {
          if (response.Status.RetVal) {
            response.Result["SMC-SL Result"].result.map((el) => {
              serviceGetter(el, url);
            });
          } else servicesRequest();
        });
  }

  function serviceGetter(el, url) {
    axios
      .get(url + el, {
        headers: {
          username: global.username,
          password: global.password,
          address: nodeIP,
          Authorization: `Bearer ${global.token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setKeepServices(data.Result["SMC-SL Result"].result[0]);
      });
  }

  const _setInactives = () => {
    const inactives = [];
    services.map((el) => {
      el.active === "inactive" && inactives.push(el.name);
    });
    dispatch(setInactives(inactives));
  };

  const _setActives = () => {
    const actives = [];
    services.map((el) => {
      el.active === "active" && actives.push(el.name);
    });
    dispatch(setActives(actives));
  };

  const _setRunnings = () => {
    const runnings = [];
    services.map((el) => {
      el.sub === "running" && runnings.push(el.name);
    });
    dispatch(setRunning(runnings));
  };

  const _setDeads = () => {
    const deads = [];
    services.map((el) => {
      el.sub === "dead" && deads.push(el.name);
    });
    dispatch(setDead(deads));
  };

  const _setExiteds = () => {
    const exiteds = [];
    services.map((el) => {
      el.sub === "exited" && exiteds.push(el.name);
    });
    dispatch(setExited(exiteds));
  };

  const _setLoadeds = () => {
    const loadeds = [];
    services.map((el) => {
      el.load === "loaded" && loadeds.push(el.name);
    });
    dispatch(setLoaded(loadeds));
  };

  const _setNotfounds = () => {
    const notfounds = [];
    services.map((el) => {
      el.load === "not-found" && notfounds.push(el.name);
    });
    dispatch(setNotFound(notfounds));
  };

  useEffect(() => {
    dispatch(setInactives([]));
    dispatch(setActives([]));
    dispatch(setRunning([]));
    dispatch(setDead([]));
    dispatch(setExited([]));
    dispatch(setLoaded([]));
    dispatch(setNotFound([]));
    servicesRequest();
  }, []);

  useEffect(() => {
    if (keep_services) {
      let hasMagenicVendor = services.find(
        (vendor) => vendor.name == keep_services.name
      );
      !hasMagenicVendor && setServices([...services, keep_services]);
      _setInactives();
      _setActives();
      _setRunnings();
      _setDeads();
      _setExiteds();
      _setLoadeds();
      _setNotfounds();
    }
  }, [keep_services]);
  return (
    <div
      className="w-100 h-100"
      style={{ display: "grid", placeItems: "center" }}
    >
      {services.length ? <ServicesTable services={services} /> : <Loading />}
    </div>
  );
}

export default Services;
