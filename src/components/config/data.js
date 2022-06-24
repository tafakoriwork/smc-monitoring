module.exports = {
  /* physical */
  physicaldata: [
    {
      root: true,
      id: "cluster_1",
      title: "Cluster1",
      method: "setCluster",
      type: "CLUSTER",
      args: "http://smc-sl-api.local/",
      children: [
        {
          id: "node_1",
          title: "Node1",
          method: "setNodeIP",
          args: { ip: "172.30.6.41", id: "node_1" },
          address: "172.30.6.41",
          type: "NODE",
          children: [
            {
              id: "_node_1_os",
              title: "OS",
              type: "OS",
              children: [
                {
                  id: "_node_1_services",
                  title: "Services",
                  method: "setAPIUrl",
                  type: "SERVICES",
                  args: "http://smc-sl-api.local/test_Services",
                  children: [
                    {
                      id: "_node_1_service_1",
                      title: "Service1",
                      method: "setAPIUrl",
                      args: "http://smc-sl-api.local/test_Service1",
                      type: "SERVICE",
                    },
                    {
                      id: "_node_1_service_2",
                      title: "Service2",
                      method: "setAPIUrl",
                      type: "SERVICE",
                      args: "http://smc-sl-api.local/test_Service2",
                    },
                  ],
                },
                {
                  id: "_node_1_hardwares",
                  title: "Hardwares",
                  details: {},
                  type: "HARDWARES",
                  children: [
                    { id: "_node_1_cpus", title: "CPUs", type: "CPUS" },
                    { id: "_node_1_hdds", title: "HDDs", type: "HDDS" },
                    { id: "_node_1_nics", title: "NICs", type: "NICS" },
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
          type: "NODE",
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
                        {
                          id: "_node_2_cpu0",
                          title: "CPU0",
                          type: "CPU",
                          method: "setAPIUrl",
                          args: "http://smc-sl-api.local/cpu/0",
                        },
                        {
                          id: "_node_2_cpu1",
                          title: "CPU1",
                          type: "CPU",
                          method: "setAPIUrl",
                          args: "http://smc-sl-api.local/cpu/1",
                        },
                      ],
                    },
                    {
                      id: "_node_2_hdds",
                      title: "HDDs",
                      children: [
                        { id: "_node_2_hdd0", title: "HDD0", type: "HDD" },
                        { id: "_node_2_hdd1", title: "HDD1", type: "HDD" },
                      ],
                    },
                    { id: "_node_2_nics", title: "NICs", type: "NICS" },
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
