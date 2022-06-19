import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import {
  information,
  setInformation,
  setspeedInformation,
  shiftInformation,
  shiftspeedInformation,
  speedInformation,
} from "../../redux/cpuStates";

function VChart() {
  const [reload, setReload] = useState(0);
  var d = new Date();
  const dispatch = useDispatch();
  const inf = useSelector(information);
  const speedinf = useSelector(speedInformation);
  const smcRequest = () => {
    axios
      .get("https://172.30.5.125/smc-sl/api/v1/oshw/cpu/0", {
        headers: {
          username: "morsa",
          password: "p@ss@ceph",
          address: "172.30.6.45",
          Authorization:
            "Bearer mTiEMSctlXyavwqZ4QbPdVsYp6CrJB9GUAkogfuKzHDW28hn1xL7ROIeNF3j5",
        },
      })
      .then((response) => response.data)
      .then((data) => {
        const ndata = data.Result["SMC-SL Result"].result;
        var n = d.toLocaleTimeString();
        if (ndata["cpu usage"]) {
          let cpuUsage =
            Math.ceil(ndata["cpu usage"]) < 0
              ? 0
              : Math.ceil(ndata["cpu usage"]);
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
          setTimeout(() => {
            setReload(Math.random());
          }, 4000);
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
