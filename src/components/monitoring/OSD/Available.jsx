import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl, nodeIp, selectedBrowser } from "../../redux/routingSlice";
import axios from "axios";
import global from "../../config/global";
import {
  setAvailable,
  setDetils,
  setTotal,
  setUsed,
  setWeight,
  _Available,
} from "../../redux/osdStates";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import Loading from "../../tools/Loading";
function Available() {
  const APIUrl = useSelector(apiUrl);
  const nodeIP = useSelector(nodeIp);
  const selected_borwser = useSelector(selectedBrowser);
  const available = useSelector(_Available);
  const dispatch = useDispatch();
  const [reload, setReload] = useState(Math.random());
  const [diagram_obj, setDiagramObj] = useState([]);
  const sessionDatas = sessionStorage.getItem(
    `${selected_borwser.id}_available`
  );
  const smcRequest = () => {
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
      .then((data) => {
        const ndata = data.Result["SMC-SL Result"]?.result[0];
        if (ndata["class"]) {
          dispatch(
            setDetils({
              id: ndata["id"],
              class: ndata["class"],
              status: ndata["status"],
              Hosts_Number: ndata["Hosts Number"],
            })
          );
            //used
          dispatch(
            setUsed({
              percentage: ndata["used percentage"],
              size: ndata["used size"],
              type: ndata["used size type"],
            })
          );

          let usedFromStorage;
          const getFromStorage22 = sessionStorage.getItem(
            `${selected_borwser.id}_used`
          );
          if (getFromStorage22)
            usedFromStorage = getFromStorage22.split(",");
          else usedFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_used`, [
            ...usedFromStorage,
            ndata["used size"],
          ]);
          
          let totalFromStorage;
          const getFromStorage = sessionStorage.getItem(
            `${selected_borwser.id}_total`
          );
          if (getFromStorage)
            totalFromStorage = getFromStorage.split(",");
          else totalFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_total`, [
            ...totalFromStorage,
            ndata["total size"],
          ]);
          //end used
          //available
          dispatch(
            setAvailable({
              size: ndata["available size"],
              type: ndata["available size type"],
            })
          );
          let availableFromStorage;
          const getFromStorage2 = sessionStorage.getItem(
            `${selected_borwser.id}_available`
          );
          if (getFromStorage2)
            availableFromStorage = getFromStorage2.split(",");
          else availableFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_available`, [
            ...availableFromStorage,
            ndata["available size"],
          ]);
          //end available
          dispatch(
            setTotal({
              size: ndata["total size"],
              type: ndata["total size type"],
            })
          );

          dispatch(setWeight(ndata["weight"]));

          dispatch(setWeight(ndata["reweight"]));
          setReload(Math.random());
        }
      });
  };

  const getMin = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return Number(Math.min(...sesstionData.map((item) => item)));
    }
    return 0;
  };

  const getMax = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return Number(Math.max(...sesstionData.map((item) => item)));
    }
    return 0;
  };

  const getAvg = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      var total = 0;
      for (var i = 0; i < sesstionData.length; i++) {
        total = Number(sesstionData[i]) + total;
      }
      return parseFloat(total / sesstionData.length).toFixed(2);
    }
    return 0;
  };

  function diagramMaker() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    !isNaN(available.size) &&
      setDiagramObj([...diagram_obj, { x: n, y: Number(available.size) }]);
    if(diagram_obj.length >= 6)
    {
      const temp = diagram_obj;
    temp.splice(0, 1);
    setDiagramObj(temp);
    }
  }

  useEffect(() => {
    smcRequest();
    diagramMaker();
    if (localStorage.getItem("_pre") !== selected_borwser?.id) {
      dispatch(setDetils([]));
      dispatch(setAvailable([]));
      dispatch(setTotal([]));
      dispatch(setUsed([]));
      setReload(Math.random());
      setDiagramObj([]);
    }
    localStorage.setItem("_pre", selected_borwser?.id);
    
  }, [reload, selected_borwser]);

  return (
    <>
      {
        diagram_obj.length ? 
        <div>
      <div className="row justify-content-between">
        <div className="col">Min: {getMin()}</div>
        <div className="col">Max: {getMax()}</div>
        <div className="col">Avg: {getAvg()}</div>
      </div>
      <VictoryChart theme={VictoryTheme.material} width={800}>
        <VictoryArea
          width={800}
          labels={({ datum }) => Math.ceil(datum.y) + available.type}
          domain={{ y: [0, Number(getMax()) * 2] }}
          style={{
            data: {
              stroke: "darkblue",
              strokeWidth: 0.5,
              fill: "darkblue",
              fillOpacity: "0.1",
            },
            parent: { border: "1px solid #ccc" },
            labels: {
              fontSize: 12,
              fill: "darkblue",
            },
          }}
          data={diagram_obj}
        />
      </VictoryChart>
      </div>
      : <Loading />
      }
    </>
  );
}

export default Available;
