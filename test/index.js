var event = require("events");

var myEmitter = new event.EventEmitter();

myEmitter.on("buttonPress", function(message) {
  console.log("You have pressed " + message + " button");
});

myEmitter.emit("buttonPress", "Enter");
