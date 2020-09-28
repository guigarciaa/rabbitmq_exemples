"use strict";

var amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", function (err, connection) {
  if (err) throw err;

  connection.createChannel(function (err, channel) {
    if (err) throw err;
    var queue = "task_queue";

    channel.assertQueue(queue, {
      durable: true,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
    channel.consume(queue,function (msg) { 
        var secs = msg.content.toString().split('.').length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        
        setTimeout(function() {
            console.log(" [x] Done");
          }, secs * 1000);
      },
      {
        noAck: true,
      }
    );
  });
});
