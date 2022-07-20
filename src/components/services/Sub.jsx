
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import {
  _actives,
  _deads,
  _exiteds,
  _inactives,
  _runnings,
} from "../redux/serviceSlice";
import Loading from "../tools/Loading";

function Sub() {
  const exited = useSelector(_exiteds);
  const dead = useSelector(_deads);
  const running = useSelector(_runnings);
  const totalCount = exited.length + dead.length + running.length;
  const data = [
    { x: "exited", y: (exited.length / totalCount) * 100 },
    { x: "dead", y: (dead.length / totalCount) * 100 },
    { x: "running", y: (running.length / totalCount) * 100 },
  ];

  return (
    <>
    {
      dead.length ? 
      <VictoryChart theme={VictoryTheme.material} width={800}>
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
    </VictoryChart> : <Loading />
    }
    </>
  );
}

export default Sub;
