//= require pusher.min
//= require web_socket
//= require swfobject
var WS = (function ($, window) {

  var WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf",
      WEB_SOCKET_DEBUG = true,
      pusher = new Pusher('c0adf081cd0f84f6bec8'),
      channels = {};

  Pusher.log = function (message) {
    console.log(message);
  }

  // Pusherのステータスを表示するラベルを設定します。
  function status_label (id) {
    pusher.connection.bind('state_change', function (states) {
      $('#'+id).text(states.current);
    });
  }

  // チャネルを取得します。
  function channel (channelName) {
    if (channels[channelName]) {

    } else {
      channels[channelName] = pusher.subscribe(channelName);
    }

    return channels[channelName];
  }

  // チャネルを購読します。
  function subscribe (channelName, success) {
    channel(channelName).bind('sample-event', success);
  }

  // イベントメッセージを発行します。
  function publish (message, success) {
    $.ajax({
      type: "POST",
      url: '/websocket',
      data: "text=" + message,
      success: success
    });
  }

  return {
    status_label: status_label,
    subscribe: subscribe,
    publish: publish
  }

})(jQuery, window);
