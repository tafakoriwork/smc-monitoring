import { apiUrl, nodeIp, selectedBrowser } from "../../redux/routingSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import global from "../../config/global";
import {
  shiftAll,
  CurrentReceivedBandwidth,
  CurrentSentBandwidth,
  setCurrentReceivedBandwidth,
  setCurrentSentBandwidth,
  setMetric,
  setTotalReceivedBandwidth,
  setTotalSentBandwidth,
  TotalReceivedBandwidth,
  TotalSentBandwidth,
  Metric,
} from "../../redux/nicStates";
function __Metric() {
  const APIUrl = useSelector(apiUrl);
  const [reload, setReload] = useState(0);
  var d = new Date();
  const dispatch = useDispatch();
  const _Metric = useSelector(Metric);
  const _TotalReceivedBandwidth = useSelector(TotalReceivedBandwidth);
  const _CurrentSentBandwidth = useSelector(CurrentSentBandwidth);
  const _CurrentReceivedBandwidth = useSelector(CurrentReceivedBandwidth);
  const _TotalSentBandwidth = useSelector(TotalSentBandwidth);
  const nodeIP = useSelector(nodeIp);
  const selected_borwser = useSelector(selectedBrowser);
  const CancelToken3 = axios.CancelToken;
  const source3 = CancelToken3.source();
  const smcRequest = () => {
    axios
      .get(APIUrl, {
        headers: {
          username: global.username,
          password: global.password,
          address: nodeIP,
          Authorization: `Bearer ${global.token}`,
        },
        cancelToken: source3.token
      })
      .then((response) => response.data)
      .then((data) => {
        const ndata = data.Result["SMC-SL Result"].result[0];
        var n = d.toLocaleTimeString();
        let total_received_bandwidth = ndata["total received bandwidth"];
        let total_sent_bandwidth = ndata["total sent bandwidth"];
        let current_received_bandwidth = ndata["current received bandwidth"];
        let current_sent_bandwidth = ndata["current sent bandwidth"];
        let metric = ndata["metric"];
        if (total_received_bandwidth) {
          dispatch(setCurrentSentBandwidth([..._CurrentSentBandwidth, { x: n, y: metric }]));
          dispatch(
            setCurrentReceivedBandwidth([
              ..._CurrentReceivedBandwidth,
              { x: n, y: total_sent_bandwidth },
            ])
          );
          dispatch(
            setTotalReceivedBandwidth([
              ..._TotalReceivedBandwidth,
              { x: n, y: current_received_bandwidth },
            ])
          );
          dispatch(
            setTotalSentBandwidth([
              ..._TotalSentBandwidth,
              { x: n, y: current_sent_bandwidth },
            ])
          );
          dispatch(
            setMetric([..._Metric, { x: n, y: current_received_bandwidth }])
          );
        }
        if (_Metric.length >= 4) {
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

     if (localStorage.getItem("nic_pre") !== selected_borwser.id) {
      source3.cancel('Operation canceled by the user.');
      dispatch(setCurrentSentBandwidth([]));
      dispatch(setCurrentReceivedBandwidth([]));
      dispatch(setTotalReceivedBandwidth([]));
      dispatch(setTotalSentBandwidth([]));
      dispatch(setMetric([]));
      setReload(Math.random());
    } 
    localStorage.setItem("nic_pre", selected_borwser.id);
  }, [reload]);
  return (
    <VictoryChart theme={VictoryTheme.material} width={800}>
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y)}
        domain={{ y: [0, 100000] }}
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
        data={_Metric}
      />
    </VictoryChart>
  );
}

export default __Metric;
