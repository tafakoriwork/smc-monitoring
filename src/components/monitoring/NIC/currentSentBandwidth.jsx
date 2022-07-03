import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { CurrentSentBandwidth } from "../../redux/nicStates";
function CSBUI() {
    const csbi = useSelector(CurrentSentBandwidth);

    const getMin = () => {
      return Math.ceil(Math.min(...csbi.map((item) => item.y)));
    };
    const getMax = () => {
      return  Math.ceil(Math.max(...csbi.map((item) => item.y)));
    };
    const getAvg = () => {
      var total = 0;
      for (var i = 0; i < csbi.length; i++) {
        total += csbi[i].y;
      }
      return Math.ceil(total / csbi.length);
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
            stroke: "orange",
            strokeWidth: 0.5,
            fill: "orange",
          },
          parent: { border: "1px solid #ccc" },
          labels: {
            fontSize: 12,
            fill: "darkblue",
          },
        }}
        data={csbi}
      />
    </VictoryChart></>)
}

export default CSBUI;
