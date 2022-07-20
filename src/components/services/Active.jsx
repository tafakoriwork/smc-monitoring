import { useEffect } from "react";
import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { _actives, _inactives } from "../redux/serviceSlice";
import Loading from "../tools/Loading";

function Active() {
  const actives = useSelector(_actives);
  const inactives = useSelector(_inactives);
  const totalCount = actives.length + inactives.length;
  const data = [{ x: "active", y: (actives.length / totalCount) * 100 },{ x: "inactive", y: (inactives.length / totalCount) * 100 },];
  return (
    <>
    {actives.length ? <VictoryChart theme={VictoryTheme.material} width={800}>
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y) + "%"}
        domain={{y: [0,100]}}
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
        data={data}
      />
    </VictoryChart> : <Loading />}
    </>
  );
}

export default Active;
