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
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() { 
    connection.close(); 
    process.exit(0); 
  }, 500);
});