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
function Services(props) {
  const { url } = props; 
  const APIUrl = useSelector(apiUrl);
  const nodeIP = useSelector(nodeIp);
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  if(url == "http://smc-sl-api.local/smc-sl/api/v1/oshw/services/" && !services.length)
  setServices([
    {
      name: "auditd.service",
      sub: "running",
      active: "active",
      load: "loaded",
    },
    {
      name: "network.service",
      sub: "exited",
      active: "active",
      load: "loaded",
    },
    {
      name: "plymouth-read-write.service",
      sub: "dead",
      active: "inactive",
      load: "loaded",
    },
    {
      name: "ypxfrd.service",
      sub: "dead",
      active: "inactive",
      load: "not-found",
    },
  ]);
  else if(!services.length)
  setServices([
    {
      name: "ceph-crash.service",
      sub: "running",
      active: "active",
      load: "loaded",
    },
    {
      name: "ceph-osd@0.service",
      sub: "exited",
      active: "active",
      load: "loaded",
    },
    {
      name: "ceph-osd@1.service",
      sub: "dead",
      active: "inactive",
      load: "loaded",
    },
    {
      name: "ceph-volume@lvm-0-915bfc5a-127a-4f2b-a49d-525661424633.service",
      sub: "dead",
      active: "inactive",
      load: "not-found",
    },
    {
      name: "ceph-volume@lvm-1-5a8ce508-dbd4-40ab-a45d-916540108260.service",
      sub: "dead",
      active: "active",
      load: "not-found",
    },
  ]);
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
              console.log(el, url);
            });
          } else servicesRequest();
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
    servicesRequest();
    _setInactives();
    _setActives();
    _setRunnings();
    _setDeads();
    _setExiteds();
    _setLoadeds();
    _setNotfounds();
  }, []);
  return (
    <div
      className="w-100 h-100"
      style={{ display: "grid", placeItems: "center" }}
    >
      <ServicesTable services={services} />
    </div>
  );
}

export default Services;
