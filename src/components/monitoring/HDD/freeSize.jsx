import {
  apiUrl,
  currentCluster,
  nodeIp,
  selectedBrowser,
} from "../../redux/routingSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import global from "../../config/global";
import {
  freeSize,
  setFreeSize,
  setTotalSize,
  setUsedSize,
  shiftAll,
  totalSize,
  usedSize,
} from "../../redux/hddstates";
function FreeSize() {
  const APIUrl = useSelector(apiUrl);
  const [reload, setReload] = useState(0);
  var d = new Date();
  const dispatch = useDispatch();
  const freesize = useSelector(freeSize);
  const totalsize = useSelector(totalSize);
  const usedsize = useSelector(usedSize);
  const nodeIP = useSelector(nodeIp);
  const selected_borwser = useSelector(selectedBrowser);
  const CancelToken2 = axios.CancelToken;
  const source2 = CancelToken2.source();
  const smcRequest = () => {
    axios
      .get(APIUrl, {
        headers: {
          username: global.username,
          password: global.password,
          address: nodeIP,
          Authorization: `Bearer ${global.token}`,
        },
        cancelToken: source2.token,
      })
      .then((response) => response.data)
      .then((data) => {
        const ndata = data.Result["SMC-SL Result"].result[0];
        var n = d.toLocaleTimeString();
        let free_size = ndata["free size"];
        let used_size = ndata["used size"];
        let total_size = ndata["total size"];
        if (free_size) {
          dispatch(
            setFreeSize([
              ...freesize,
              { x: n, y: global.byteToGigaByte(free_size) },
            ])
          );
          dispatch(
            setUsedSize([
              ...usedsize,
              { x: n, y: global.byteToGigaByte(used_size) },
            ])
          );
          dispatch(
            setTotalSize([
              ...totalsize,
              { x: n, y: global.byteToGigaByte(total_size) },
            ])
          );
        }
        if (freesize.length == 4) {
          dispatch(shiftAll());
        }
        setReload(Math.random());
      })
      .catch((error) => {
        const ndata = error;
      });
  };
  useEffect(() => {
    smcRequest();

    if (localStorage.getItem("hdd_pre") !== selected_borwser.id) {
      source2.cancel("Operation canceled by the user.");
      dispatch(setFreeSize([]));
      dispatch(setUsedSize([]));
      dispatch(setTotalSize([]));
      setTimeout(() => {
        setReload(Math.random());
      }, 2000);
    }
    localStorage.setItem("hdd_pre", selected_borwser.id);
  }, [reload]);

  const getMin = () => {
    return Math.min(...freesize.map((item) => item.y));
  };
  const getMax = () => {
    return Math.max(...freesize.map((item) => item.y));
  };
  const getAvg = () => {
    var total = 0;
    for (var i = 0; i < freesize.length; i++) {
      total += freesize[i].y;
    }
    return Math.floor(total / freesize.length);
  };
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
          labels={({ datum }) => Math.ceil(datum.y) + "GB"}
          domain={{ y: [0, getMax()] }}
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
          data={freesize}
        />
      </VictoryChart>
    </>
  );
}

export default FreeSize;
