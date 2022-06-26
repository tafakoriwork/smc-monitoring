import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { TotalReceivedBandwidth } from "../../redux/nicStates";
function TRBUI() {
    const trbi = useSelector(TotalReceivedBandwidth);
return (<>
 <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y)}
        domain={{y: [0, 10000]}}
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
    </VictoryChart></>)
}

export default TRBUI;
