

$(document).ready(function(){


    var apiKey = '44555732';
    var sessionId = '1_MX40NDU1NTczMn5-U2F0IERlYyAxNCAwMzozOTo1OSBQU1QgMjAxM34wLjY2MjQyMzd-';
    var token = 'T1==cGFydG5lcl9pZD00NDU1NTczMiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz0wN2I2NTI0NWU2NGRjMmUzMDY0NGQwMjYwMDliN2YyMTM5ZGY2MDQ3OnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9MV9NWDQwTkRVMU5UY3pNbjUtVTJGMElFUmxZeUF4TkNBd016b3pPVG8xT1NCUVUxUWdNakF4TTM0d0xqWTJNalF5TXpkLSZjcmVhdGVfdGltZT0xMzg3MDIxMjI2Jm5vbmNlPTAuNTYzNDM4MDQwMDQxNzkzNSZleHBpcmVfdGltZT0xMzg5NjEzMjI2JmNvbm5lY3Rpb25fZGF0YT0=';
    var session, publisher;

    route();

    $('#loginForm').on('submit', function(){
        var username = $('#username').val();
        if(username == "") {
            alert('User name should not be empty.');
            return false;
        }

        saveUsername(username);

        $('#loginPage').hide();
        $('#boxPage').show();
        startInterviewBox();
        location.hash = "#interviewbox"; 
        return false;

    });

    function route() {
        if(location.hash !== '#interviewbox') {
            $('#loginPage').show();
            $('#boxPage').hide();
            autoFocusUsername();
        } else {
            startInterviewBox();
        }
    }

    function autoFocusUsername() {
        $('#username').select();
    }


    function sessionConnectedHandler (event) {
        session.publish( publisher );
        subscribeToStreams(event.streams);
    }
    function subscribeToStreams(streams) {
        var subscribersElement = $('#subscribers');
        var subscriberProperties = {width:200, height:150};
        for (var i = 0; i < streams.length; i++) {
            var stream = streams[i];
            if (stream.connection.connectionId 
             != session.connection.connectionId) 
            {
                var div = document.createElement('div');
                var subscriberId = 'subscriber_' + i;
                div.setAttribute('id', subscriberId);

                subscribersElement.append(div);
                $(div).css('float','left');
                $(div).css('margin-right','20px');
                $(div).css('margin-bottom','20px');

                session.subscribe(stream, subscriberId, subscriberProperties);
            }
        }
    }
    function streamCreatedHandler(event) {
        subscribeToStreams(event.streams);
    }

    function startInterviewBox() {
        $('#loginPage').hide();
        $('#boxPage').show();
        var publisherName = getUsername();
        var publisherProperties = { name:publisherName};

        publisher = TB.initPublisher(apiKey, 'publisher', publisherProperties);
        session   = TB.initSession(sessionId);

        session.connect(apiKey, token);
        session.addEventListener("sessionConnected", 
        sessionConnectedHandler);

        session.addEventListener("streamCreated", 
        streamCreatedHandler);

        window.setTimeout(function(){
            $('body').trigger('welcome');
        }, 500);
        

    }




})