"use strict";

var amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", function (err, connection) {
  if (err) throw err;

  connection.createChannel(function (err, channel) {
    if (err) throw err;

    var queue = "task_queue";
    var msg = process.argv.slice ( 2 ) .join ( '' ) || "Olá Mundo!";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
    });
    console.log("[x] send %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
