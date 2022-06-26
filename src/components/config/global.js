module.exports = {
    nodeIp: "172.30.6",
    token: localStorage.getItem('token'),
    username: "morsa",
    password: "p@ss@ceph",
    byteToGigaByte: (n) => Math.ceil(n / Math.pow(10,9)),
    user: {
        name: localStorage.getItem('username'),
    }
}