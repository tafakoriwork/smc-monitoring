module.exports = {
  /* physical */
  physicaldata: [
    {
      root: true,
      id: "cluster_1",
      title: "Cluster1",
      method: "setCluster",
      args: "http://smc-sl-api.local/",
      children: [
        {
          id: "node_1",
          title: "Node1",
          method: "setNodeIP",
          args: { ip: "172.30.6.41", id: "node_1" },
          children: [
            {
              id: "_node_1_os",
              title: "OS",
              children: [
                {
                  id: "_node_1_services",
                  title: "Services",
                  children: [
                    { id: "_node_1_service_1", title: "Service1" },
                    { id: "_node_1_service_2", title: "Service2" },
                  ],
                },
                {
                  id: "_node_1_hardwares",
                  title: "Hardwares",
                  children: [
                    { id: "_node_1_cpus", title: "CPUs" },
                    { id: "_node_1_hdds", title: "HDDs" },
                    { id: "_node_1_nics", title: "NICs" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "node_2",
          title: "Node2",
          method: "setNodeIP",
          args: { ip: "172.30.6.42", id: "node_2" },
          children: [
            {
              id: "_node_2_os",
              title: "OS",
              children: [
                {
                  id: "_node_2_services",
                  title: "Services",
                  children: [
                    { id: "_node_2_service_1", title: "Service1" },
                    { id: "_node_2_service_2", title: "Service2" },
                  ],
                },
                {
                  id: "_node_2_hardwares",
                  title: "Hardwares",
                  children: [
                    {
                      id: "_node_2_cpus",
                      title: "CPUs",
                      children: [
                        { id: "_node_2_cpu0", title: "CPU0" },
                        { id: "_node_2_cpu1", title: "CPU1" },
                      ],
                    },
                    {
                      id: "_node_2_hdds",
                      title: "HDDs",
                      children: [
                        { id: "_node_2_cpu0", title: "CPU0" },
                        { id: "_node_2_cpu1", title: "CPU1" },
                      ],
                    },
                    { id: "_node_2_nics", title: "NICs" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
