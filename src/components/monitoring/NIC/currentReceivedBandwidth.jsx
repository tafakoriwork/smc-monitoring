import { useSelector } from "react-redux";
import { totalSize } from "../../redux/hddstates";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { CurrentReceivedBandwidth } from "../../redux/nicStates";
function CRBUI() {
    const crbi = useSelector(CurrentReceivedBandwidth);
return (<>
 <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y)}
        domain={{y: [0, 1000]}}
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
