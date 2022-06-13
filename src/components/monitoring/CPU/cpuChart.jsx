
import { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

function VChart() {
  const [datad, setData] = useState([]);
  let i = 0;

  const smcRequest = async() => {
    try {
      const response = await fetch('https://172.30.5.125/smc-sl/api/v1/oshw/cpu/0',{
      headers:{
        "Username": "morsa",
        "Password": "p@ss@ceph",
        "Address": "172.30.6.45",
        "Authorization": "Bearer mTiEMSctlXyavwqZ4QbPdVsYp6CrJB9GUAkogfuKzHDW28hn1xL7ROIeNF3j5",
    }});
      const result = await response;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
   
  };

  useEffect(() => {
    smcRequest();
  }, []);
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        animate={{
          duration: 500,
          onLoad: { duration: 300 },
        }}
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
        data={datad}
      />
    </VictoryChart>
  );
}

export default VChart;
