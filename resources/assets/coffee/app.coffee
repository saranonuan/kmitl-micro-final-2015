online_timeouts = {}
web_timeouts = {}

$(document).foundation();
console.log("Load Foundation");

client = new Paho.MQTT.Client("gis.it.kmitl.ac.th", 3000, "judge-web");
client.onConnectionLost = (response) ->
	if response.errorCode != 0
		console.log("onConnectionLost:" + response.errorMessage)
	connect()
	return;

callOnlineTimeout = (student_id) ->
  $('#deviceStatus-' + student_id).prop( "checked", false );
  delete online_timeouts[student_id]
  console.log("Timeout Call", student_id);

callOnlineWebTimeout = (student_id) ->
  $('#deviceStatusWeb-' + student_id).prop( "checked", false );
  delete web_timeouts[student_id]
  console.log("Timeout Call", student_id);

client.onMessageArrived = (message) ->
	topic = message.destinationName
	console.log("Message [" + topic + "]>> ", message)

	if topic == "Final/Solar"
		solar = message.payloadString;
		$('#solar-value').html(solar)
		solar-meter = $('#solar-meter')
		solar-meter.css('width', solar + "%")
		solar-meter.parent().removeClass('secondary alert success medium')
		solar = parseInt(solar)
		if solar >= 0 and solar < 50
			solar-meter.parent().addClass('success')
		else if solar >= 50 and solar < 80
			solar-meter.parent().addClass('medium')
		else if solar >= 80 and solar <= 100
			solar-meter.parent().addClass('alert')
	else if topic == "Final/Status"
		msg = message.payloadString.split("-")
		if msg.length == 2 and msg[0] == "ONLINE"
			student_id = String(msg[1])
			if online_timeouts[student_id]
				timeout = online_timeouts[student_id]
				clearTimeout(timeout)
				delete online_timeouts[student_id]
				console.log("Clear Timeout", student_id)
			$('#deviceStatus-' + student_id).prop( "checked", true )
			online_timeouts[student_id] = setTimeout(callOnlineTimeout, 5000, student_id);
  else if topic == "Final/Web"
    msg = message.payloadString.split("-")
    if msg.length == 2 and msg[0] == "ONLINE"
      student_id = String(msg[1])
      if web_timeouts[student_id]
        timeout = web_timeouts[student_id]
        clearTimeout(timeout)
        delete web_timeouts[student_id]
        console.log("Clear Timeout", student_id)
      $('#deviceStatus-' + student_id).prop( "checked", true )
      web_timeouts[student_id] = setTimeout(callOnlineWebTimeout, 5000, student_id);
	return;

connect = () ->
	client.connect({
		onSuccess: () ->
      client.subscribe("Final/Solar")
      client.subscribe("Final/Status")
      client.subscribe("Final/Web")
      return
	});

connect()