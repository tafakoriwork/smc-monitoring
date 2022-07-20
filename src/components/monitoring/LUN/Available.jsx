import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import global from "../../config/global";
import {
    _available,
    setUsed,
    setAvailable
} from "../../redux/lunStates";
import { apiUrl, nodeIp, selectedBrowser } from "../../redux/routingSlice";
function Available() {
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();
  const _available_ = useSelector(_available);
  const nodeIP = useSelector(nodeIp);
  const APIUrl = useSelector(apiUrl);
  const selected_borwser = useSelector(selectedBrowser);
  const [diagram_obj, setDiagramObj] = useState([]);
  const sessionDatas = sessionStorage.getItem(`${selected_borwser.id}_available`);

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
      return parseFloat(total / (sesstionData.length)).toFixed(2);
    }
    return 0;
  };
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
      .then((response) => response.data)
      .then((data) => {
        const ndata = data.Result["SMC-SL Result"].result[0];
        dispatch(setAvailable(
          {
            size: ndata['available'],
            type: ndata['available type'],
          }));
        dispatch(setUsed( {
          size: ndata['used size'],
          type: ndata['used type'],
        }));
        let availableFromStorage;
          const getFromStorage = sessionStorage.getItem(
            `${selected_borwser.id}_available`
          );
          if (getFromStorage) availableFromStorage = getFromStorage.split(",");
          else availableFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_available`, [
            ...availableFromStorage,
            ndata['available'],
          ]);

          let usedFromStorage;
          const getFromStorage2 = sessionStorage.getItem(
            `${selected_borwser.id}_used`
          );
          if (getFromStorage2) usedFromStorage = getFromStorage2.split(",");
          else usedFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_used`, [
            ...usedFromStorage,
            ndata['used size'],
          ]);

          setReload(Math.random());
      })
      .catch((error) => {
        const ndata = error;
      });
  };

  function diagramMaker() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    if(_available_?.size)
    setDiagramObj([...diagram_obj, { x: n, y: _available_?.size }]);
    if (diagram_obj.length > 6) {
      const temp = diagram_obj;
      temp.splice(0, 1);
      setDiagramObj(temp);
    }
  }

  useEffect(() => {
    smcRequest();
    if (localStorage.getItem("_pre") !== selected_borwser.id) {
      dispatch(setAvailable(null));
      dispatch(setUsed(null));
      setReload(Math.random());
    }
    localStorage.setItem("_pre", selected_borwser.id);
    diagramMaker();
  }, [reload]);

  return (
    <>
      <div className="row justify-content-between">
        <div className="col">Min: {getMin()}</div>
        <div className="col">Max: {getMax()}</div>
        <div className="col">Avg: {getAvg()}</div>
      </div>
      <VictoryChart theme={VictoryTheme.material} width={800}>
        <VictoryArea
          width={800}
          labels={({ datum }) => Math.ceil(datum.y) + _available_?.type}
          domain={{ y: [0, getMax() * 2] }}
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
    </>
  );
}

export default Available;
