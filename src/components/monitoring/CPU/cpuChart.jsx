import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import global from "../../config/global";
import {
  information,
  setInformation,
  setspeedInformation,
  shiftInformation,
  shiftspeedInformation,
  speedInformation,
} from "../../redux/cpuStates";
import {
  apiUrl,
  currentCluster,
  nodeIp,
  selectedBrowser,
} from "../../redux/routingSlice";
function VChart() {
  const [reload, setReload] = useState(0);
  var d = new Date();
  const dispatch = useDispatch();
  const inf = useSelector(information);
  const speedinf = useSelector(speedInformation);
  const nodeIP = useSelector(nodeIp);
  const APIUrl = useSelector(apiUrl);
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
        const ndata = data.Result["SMC-SL Result"].result;
        var n = d.toLocaleTimeString();
        if (ndata["cpu usage"] >= 0) {
          let cpuUsage = Math.ceil(ndata["cpu usage"]);
          dispatch(setInformation([...inf, { x: n, y: cpuUsage }]));
          dispatch(
            setspeedInformation([
              ...speedinf,
              { x: n, y: Math.ceil(ndata["cpu current speed"]) },
            ])
          );
          if (inf.length == 6) {
            dispatch(shiftInformation());
            dispatch(shiftspeedInformation());
          }
        }
        if (localStorage.getItem("cpu_pre") !== selected_borwser.id) {
          dispatch(setInformation([]));
          dispatch(setspeedInformation([]));
        }
        localStorage.setItem("cpu_pre", selected_borwser.id);
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
    <VictoryChart theme={VictoryTheme.material} width={800}>
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y) + "%"}
        domain={{ y: [0, 100] }}
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
        data={inf}
      />
    </VictoryChart>
  );
}

export default VChart;
