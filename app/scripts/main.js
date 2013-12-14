console.log('\'Allo \'Allo!');

var apiKey = '44555732';
//var secret = 'ee6c729dae06482e81e9e7aae00784ded0abd3e5';
var sessionId = '1_MX40NDU1NTczMn5-U2F0IERlYyAxNCAwMzozOTo1OSBQU1QgMjAxM34wLjY2MjQyMzd-';
var token = 'T1==cGFydG5lcl9pZD00NDU1NTczMiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz0wN2I2NTI0NWU2NGRjMmUzMDY0NGQwMjYwMDliN2YyMTM5ZGY2MDQ3OnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9MV9NWDQwTkRVMU5UY3pNbjUtVTJGMElFUmxZeUF4TkNBd016b3pPVG8xT1NCUVUxUWdNakF4TTM0d0xqWTJNalF5TXpkLSZjcmVhdGVfdGltZT0xMzg3MDIxMjI2Jm5vbmNlPTAuNTYzNDM4MDQwMDQxNzkzNSZleHBpcmVfdGltZT0xMzg5NjEzMjI2JmNvbm5lY3Rpb25fZGF0YT0=';


function sessionConnectedHandler (event) {
    session.publish( publisher );
    subscribeToStreams(event.streams);
}
function subscribeToStreams(streams) {
    var subscribersElement = $('#subscribers');
    console.log( 'the session connectionId is:', session.connection.connectionId);
    for (var i = 0; i < streams.length; i++) {
        var stream = streams[i];
        console.log('the stream connectionId is:', stream.connection.connectionId);
        if (stream.connection.connectionId 
         != session.connection.connectionId) 
        {
            var div = document.createElement('div');
            var subscriberId = 'subscriber_' + i;
            div.setAttribute('id', subscriberId);

            subscribersElement.append(div);

            session.subscribe(stream, subscriberId);
        }
    }
}
function streamCreatedHandler(event) {
    subscribeToStreams(event.streams);
}

var publisher = TB.initPublisher(apiKey, 'publisher');
var session   = TB.initSession(sessionId);

session.connect(apiKey, token);
session.addEventListener("sessionConnected", 
 sessionConnectedHandler);

session.addEventListener("streamCreated", 
 streamCreatedHandler);