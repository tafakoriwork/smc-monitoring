import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { TotalReceivedBandwidth } from "../../redux/nicStates";
import Loading from "../../tools/Loading";
function TRBUI() {
  const trbi = useSelector(TotalReceivedBandwidth);

  const getMin = () => {
    return Math.ceil(Math.min(...trbi.map((item) => item.y)));
  };
  const getMax = () => {
    return Math.ceil(Math.max(...trbi.map((item) => item.y)));
  };
  const getAvg = () => {
    var total = 0;
    for (var i = 0; i < trbi.length; i++) {
      total += trbi[i].y;
    }
    return Math.ceil(total / trbi.length);
  };

  return (
    <>
      {trbi.length ? (
        <div>
          <div className="row justify-content-between">
            <div className="col">Min: {getMin()}</div>
            <div className="col">Max: {getMax()}</div>
            <div className="col">Avg: {getAvg()}</div>
          </div>
          <VictoryChart theme={VictoryTheme.material} width={800}>
            <VictoryArea
              width={800}
              labels={({ datum }) => Math.ceil(datum.y)}
              domain={{ y: [0, getMax() * 2] }}
              style={{
                data: {
                  stroke: "violet",
                  strokeWidth: 0.5,
                  fill: "violet",
                },
                parent: { border: "1px solid #ccc" },
                labels: {
                  fontSize: 12,
                  fill: "darkblue",
                },
              }}
              data={trbi}
            />
          </VictoryChart>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default TRBUI;
