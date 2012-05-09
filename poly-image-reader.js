(function() {
  var determinePlatform, loadFile, setUpListener;

  loadFile = function(file, callback) {
    return function(event) {
      var data;
      data = event.target.result;
      return callback(file, data);
    };
  };

  setUpListener = function($div, callback) {
    $div.bind("dragover", function(evt) {
      evt.stopPropagation();
      return evt.preventDefault();
    });
    return $div.bind("drop", function(evt) {
      var file, files, reader, _i, _len, _results;
      evt.stopPropagation();
      evt.preventDefault();
      files = evt.originalEvent.dataTransfer.files;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        if (!file.type.match('image.*')) {
          continue;
        }
        reader = new FileReader();
        reader.onload = loadFile(file, callback);
        _results.push(reader.readAsDataURL(file));
      }
      return _results;
    });
  };

  determinePlatform = function(platform) {
    var href;
    href = window.location.href;
    if (platform === 'mobile' || (href.indexOf('polyPreview=tablet') !== -1) || (href.indexOf('polyPreview=phone') !== -1)) {
      return 'mobile';
    }
    if (platform === 'browser' || (href.indexOf('polyPreview=browser') !== -1)) {
      return 'browser';
    }
    if (typeof FileReader !== "undefined" && FileReader !== null) {
      return 'browser';
    }
    if (typeof navigator !== "undefined" && navigator !== null ? navigator.camera : void 0) {
      return 'mobile';
    }
  };

  window.polyImageReader = function($div, options, callback) {
    var browserSelector, mobileSelector, platform;
    options = options || {};
    browserSelector = options.browserSelector || ".browser";
    mobileSelector = options.mobileSelector || ".mobile";
    platform = determinePlatform(options.platform);
    $div.find(browserSelector).hide();
    $div.find(mobileSelector).hide();
    if (platform === 'browser') {
      $div.find(browserSelector).show();
      return setUpListener($div, callback);
    } else if (platform === 'mobile') {
      $div.find(mobileSelector).show();
      return setUpMobile($div, callback);
    }
  };

}).call(this);
