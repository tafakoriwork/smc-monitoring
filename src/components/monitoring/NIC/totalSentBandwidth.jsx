import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { TotalSentBandwidth } from "../../redux/nicStates";
function TSBUI() {
    const tsbi = useSelector(TotalSentBandwidth);
return (<>
 <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y)}
        domain={{y: [0, 10000]}}
        style={{
          data: {
            stroke: "yellow",
            strokeWidth: 0.5,
            fill: "yellow",
          },
          parent: { border: "1px solid #ccc" },
          labels: {
            fontSize: 12,
            fill: "darkblue",
          },
        }}
        data={tsbi}
      />
    </VictoryChart></>)
}

export default TSBUI;
