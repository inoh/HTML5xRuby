(function () {

  // Chrome
  var RTCPeerConnection = webkitRTCPeerConnection;

  // Chrome
  var servers = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
  // var servers = null;
  var connections = {};
  var getUserMedia = navigator.webkitGetUserMedia.bind(navigator);

  // 指定したVideo要素にカメラを表示します。
  function settingVideo (video) {
    getUserMedia({video:true}, function (stream) {
      video.src = webkitURL.createObjectURL(stream);
      connect(stream);
    });
  }

  function connect (stream) {
    var pc1 = new RTCPeerConnection(servers);
    pc1.onicecandidate = function (event){
      if (event.candidate) {
        pc2.addIceCandidate(new RTCIceCandidate(event.candidate));
      }
    };
    var pc2 = new RTCPeerConnection(servers);
    pc2.onicecandidate = function (event){
      if (event.candidate) {
        pc1.addIceCandidate(new RTCIceCandidate(event.candidate));
      }
    };
    pc2.onaddstream = function (event){
      var vid2 = document.getElementById('video02')
      vid2.src = URL.createObjectURL(event.stream);
    }; 
    pc1.addStream(stream);
    pc1.createOffer(function (desc){
      pc1.setLocalDescription(desc);
      pc2.setRemoteDescription(desc);
      pc2.createAnswer(function (desc){
          pc2.setLocalDescription(desc);
          pc1.setRemoteDescription(desc);
        }, null,
        {'mandatory': {'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true }}
      );
    });

    /*
    var connection = new RTCPeerConnection(servers);
    connection.onicecandidate = function (event){
      if (event.candidate) {
        pc2.addIceCandidate(new RTCIceCandidate(event.candidate));
        trace("Local ICE candidate: \n" + event.candidate.candidate);
      }
    };
    return connection;
    */
  }

  // connectionの状態をログに出力します。
  function connectionStateLog (start_message) {
    if (start_message) {
      console.log('---> ' + start_message);
    }
    // http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCIceConnectionState
    console.log('iceConnectionState : ' + connection.iceConnectionState);
    // http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCIceGatheringState
    console.log('iceGatheringState : ' + connection.iceGatheringState);
    // http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription
    console.log('localDescription : ' + connection.localDescription);
    // onaddstream
    // onicecandidate
    // oniceconnectionstatechange
    // onnegotiationneeded
    // onremovestream
    // onsignalingstatechange
    // http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription
    console.log('remoteDescription : ' + connection.remoteDescription);
    // http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSignalingState
    console.log('signalingState : ' + connection.signalingState);
  }

  this.WR = {
    settingVideo: settingVideo,
    connect: connect,
    connectionStateLog: connectionStateLog
  }

}).call(this);