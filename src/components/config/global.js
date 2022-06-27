module.exports = {
    nodeIp: "172.30.6",
    token: localStorage.getItem('token'),
    username: "morsa",
    password: "p@ss@ceph",
    byteToGigaByte: (n) => Math.ceil(n / Math.pow(10,9)),
    user: {
        name: localStorage.getItem('username'),
    },
    login_url: "http://smc-sl-api.local/smc-sl/api/v1/oshw/auth/login",
    logout_url: "http://smc-sl-api.local/smc-sl/api/v1/oshw/auth/logout"
}