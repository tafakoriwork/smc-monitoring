import axios from "axios";
import { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

function VChart() {
  const [datad, setData] = useState([{ x: 0, y: 0 }]);
  const smcRequest = () => {
    axios
      .get("http://192.168.101.32/smsAPI/")
      .then((response) => response.data)
      .then((ndata) => {
        if(datad.length > 8)
        {
          let newarr = datad;
          newarr = newarr.shift();
          setData(newarr);
        }
        else
        setData((datad) => [
          ...datad,
          { x: ndata["cpu usage"], y: ndata["cpu current speed"] },
        ]);
      })
      .catch((error) => {
        const ndata = error.response.data;
        if(datad.length > 8)
        {
          let newarr = [...datad];
          newarr = newarr.shift();
          console.log([newarr]);
        }
        else
        setData((datad) => [
          ...datad,
          { x: ndata["cpu usage"], y: ndata["cpu current speed"] },
        ]);
      });
  };

  smcRequest();
  setInterval(() => {
    smcRequest();
  }, 20000);
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        domain={{  y: [1.8, 4] }}
        animate={{
          duration: 500,
        }}
        style={{
          data: { stroke: "darkblue", strokeWidth: 0.4, },
          parent: { border: "1px solid #ccc" },
        }}
        data={datad}
      />
    </VictoryChart>
  );
}

export default VChart;
