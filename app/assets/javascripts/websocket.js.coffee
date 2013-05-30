$ ->
    WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf"
    Pusher.log = (message) ->
        window.console.log(message) if (window.console && window.console.log)
    WEB_SOCKET_DEBUG = true
    pusher = new Pusher('c0adf081cd0f84f6bec8')
    pusher.connection.bind 'state_change', (states) ->
        $('#status').text(states.current)
    channel = pusher.subscribe('sample-channel')
    channel.bind 'sample-event', (data) ->
        $("#msg").prepend("<p>"+data.message+"</p>")
    $("#input").keypress (e) ->
        if(e.keyCode ==13)
            $.ajax
                type: "POST"
                url: "/websocket"
                data: "text="+$('#input').val()
                success: ->
                    $("#input").val("")
