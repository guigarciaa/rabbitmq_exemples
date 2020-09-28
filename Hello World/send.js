"use strict";
var config = require('../config');
var amqp = require("amqplib/callback_api");
amqp.connect(config.getStringConnection(), function (err, connection) {
  if (err) throw err;

  connection.createChannel(function (err, channel) {
    if (err) throw err;

    var queue = "hello";
    var msg = "Hello world";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log("[x] send %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
