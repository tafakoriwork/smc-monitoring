import { useSelector } from "react-redux";
import { totalSize } from "../../redux/hddstates";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { CurrentReceivedBandwidth } from "../../redux/nicStates";
function CRBUI() {
    const crbi = useSelector(CurrentReceivedBandwidth);

  const getMin = () => {
    return Math.ceil(Math.min(...crbi.map((item) => item.y)));
  };
  const getMax = () => {
    return  Math.ceil(Math.max(...crbi.map((item) => item.y)));
  };
  const getAvg = () => {
    var total = 0;
    for (var i = 0; i < crbi.length; i++) {
      total += crbi[i].y;
    }
    return Math.ceil(total / crbi.length);
  };
  return (
    <>
      <div className="row justify-content-between">
        <div className="col">Min: {getMin()}</div>
        <div className="col">Max: {getMax()}</div>
        <div className="col">Avg: {getAvg()}</div>
      </div>
 <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y)}
        domain={{y: [0, getMax()]}}
        style={{
          data: {
            stroke: "pink",
            strokeWidth: 0.5,
            fill: "pink",
          },
          parent: { border: "1px solid #ccc" },
          labels: {
            fontSize: 12,
            fill: "darkblue",
          },
        }}
        data={crbi}
      />
    </VictoryChart></>)
}

export default CRBUI;
