var WR = (function ($, window) {

  // 指定したVideo要素にカメラを表示します。
  function settingVideo (id) {
    navigator.webkitGetUserMedia({video:true},
      function (stream) {
        var video = document.getElementById(id);
        video.src = webkitURL.createObjectURL(stream);
      }
    );
  }

  return {
    settingVide: settingVideo
  }

})(jQuery, window);