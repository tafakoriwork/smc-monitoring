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
        var n = d.toLocaleTimeString();
        let free_size = ndata["free size"];
        let used_size = ndata["used size"];
        let total_size = ndata["total size"];
        if(free_size){
      dispatch(setFreeSize([...freesize, { x: n, y: global.byteToGigaByte(free_size)}]));
       dispatch(setUsedSize([...usedsize, { x: n, y: global.byteToGigaByte(used_size) }]));
       dispatch(setTotalSize([...totalsize, { x: n, y: global.byteToGigaByte(total_size) }]));
    }
        if (freesize.length == 4) {
          dispatch(shiftAll());
        }
        if (localStorage.getItem("hdd_pre") !== selected_borwser.id) {
          dispatch(setFreeSize([]));
          dispatch(setUsedSize([]));
          dispatch(setTotalSize([]));
        }
        localStorage.setItem("hdd_pre", selected_borwser.id);
        setReload(Math.random());
      })
      .catch((error) => {
        const ndata = error;
      });
  };
  useEffect(() => {
    smcRequest();
  }, [reload]);
  return (
        <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y) + "GB"}
        domain={{y: [0, 128]}}
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
  );
}

export default FreeSize;
