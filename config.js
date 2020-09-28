module.exports = {
    IP_CONTAINER: "172.17.0.2",
    PROTOCOLS: "amqp",
    getStringConnection: function() {
        return `${this.PROTOCOLS}://${this.IP_CONTAINER}`
    }
}