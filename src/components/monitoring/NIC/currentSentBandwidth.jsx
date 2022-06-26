import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { CurrentSentBandwidth } from "../../redux/nicStates";
function CSBUI() {
    const csbi = useSelector(CurrentSentBandwidth);
return (<>
 <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y)}
        domain={{y: [0, 10000]}}
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
