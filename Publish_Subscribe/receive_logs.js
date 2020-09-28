"use strict";

var config = require('../config');
var amqp = require('amqplib/callback_api');

amqp.connect(config.getStringConnection(), function(err, connection) {
  if (err) {
    throw err;
  }
  connection.createChannel(function(err, channel) {
    if (err) {
      throw err;
    }
    var exchange = 'logs';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function(err, q) {
      if (err) {
        throw err;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        if(msg.content) {
            console.log(" [x] %s", msg.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});