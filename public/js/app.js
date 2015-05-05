(function() {
  var callOnlineTimeout, callOnlineWebTimeout, client, connect, online_timeouts, web_timeouts;

  online_timeouts = {};

  web_timeouts = {};

  $(document).foundation();

  console.log("Load Foundation");

  client = new Paho.MQTT.Client("gis.it.kmitl.ac.th", 3000, "judge-web");

  client.onConnectionLost = function(response) {
    if (response.errorCode !== 0) {
      console.log("onConnectionLost:" + response.errorMessage);
    }
    connect();
  };

  callOnlineTimeout = function(student_id) {
    $('#deviceStatus-' + student_id).prop("checked", false);
    delete online_timeouts[student_id];
    return console.log("Timeout Call", student_id);
  };

  callOnlineWebTimeout = function(student_id) {
    $('#deviceStatusWeb-' + student_id).prop("checked", false);
    delete web_timeouts[student_id];
    return console.log("Timeout Call", student_id);
  };

  client.onMessageArrived = function(message) {
    var meter, msg, solar, student_id, timeout, topic;
    topic = message.destinationName;
    console.log("Message [" + topic + "]>> ", message);
    if (topic === "Final/Solar") {
      solar = message.payloadString;
      $('#solar-value').html(solar);
      solar - (meter = $('#solar-meter'));
      solar - meter.css('width', solar + "%");
      solar - meter.parent().removeClass('secondary alert success medium');
      solar = parseInt(solar);
      if (solar >= 0 && solar < 50) {
        solar - meter.parent().addClass('success');
      } else if (solar >= 50 && solar < 80) {
        solar - meter.parent().addClass('medium');
      } else if (solar >= 80 && solar <= 100) {
        solar - meter.parent().addClass('alert');
      }
    } else if (topic === "Final/Status") {
      msg = message.payloadString.split("-");
      if (msg.length === 2 && msg[0] === "ONLINE") {
        student_id = String(msg[1]);
        if (online_timeouts[student_id]) {
          timeout = online_timeouts[student_id];
          clearTimeout(timeout);
          delete online_timeouts[student_id];
          console.log("Clear Timeout", student_id);
        }
        $('#deviceStatus-' + student_id).prop("checked", true);
        online_timeouts[student_id] = setTimeout(callOnlineTimeout, 5000, student_id);
      } else if (topic === "Final/Web") {
        msg = message.payloadString.split("-");
        if (msg.length === 2 && msg[0] === "ONLINE") {
          student_id = String(msg[1]);
          if (web_timeouts[student_id]) {
            timeout = web_timeouts[student_id];
            clearTimeout(timeout);
            delete web_timeouts[student_id];
            console.log("Clear Timeout", student_id);
          }
          $('#deviceStatus-' + student_id).prop("checked", true);
          web_timeouts[student_id] = setTimeout(callOnlineWebTimeout, 5000, student_id);
        }
      }
    }
  };

  connect = function() {
    return client.connect({
      onSuccess: function() {
        client.subscribe("Final/Solar");
        client.subscribe("Final/Status");
        client.subscribe("Final/Web");
      }
    });
  };

  connect();

}).call(this);

//# sourceMappingURL=app.js.map