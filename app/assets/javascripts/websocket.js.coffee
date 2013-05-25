$ ->
    Pusher.log = (message) ->
        window.console.log(message) if (window.console && window.console.log)
    WEB_SOCKET_DEBUG = true
    pusher = new Pusher('c0adf081cd0f84f6bec8')
    pusher.connection.bind 'initialized', ->
        $('#status').text('initialized')
    pusher.connection.bind 'connecting', ->
        $('#status').text('connecting')
    pusher.connection.bind 'connected', ->
        $('#status').text('connected')
    pusher.connection.bind 'disconnected', ->
        $('#status').text('disconnected')
    pusher.connection.bind 'error', (err) ->
        $('#status').text('error')
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
