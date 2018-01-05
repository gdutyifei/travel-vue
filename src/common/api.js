// Server API
export default {
  init: function(callback) {
    var Bridge;
    if(/(Android)/i.test(navigator.userAgent)) {
      document.addEventListener('WebViewJavascriptBridgeReady', function(event) {
        console.log("event: " + event);
        Bridge = event.bridge;

        Bridge.init(function (message, responseCallback) {
          console.log('JS got a message', message);
          var data = {'Javascript Responds': 'Wee!'};
          console.log('JS responding with', data);
          responseCallback(data);
        });

        Bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
          console.log('ObjC called testJavascriptHandler with', data);
          var responseData = {'Javascript Says': 'Right back atcha!'};
          console.log('JS responding with', responseData);
          responseCallback(responseData);
        });
        global.Bridge = Bridge;
        callback(Bridge);
      }, false);
    } else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      function setupWebViewJavascriptBridge(callback) {
        if(window.WebViewJavascriptBridge) {
          return callback(WebViewJavascriptBridge);
        }
        if(window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
          document.documentElement.removeChild(WVJBIframe)
        }, 0)
      }
      setupWebViewJavascriptBridge(function(bridge) {
        Bridge = bridge;
        global.Bridge = bridge;
        callback(Bridge);
        console.log(Bridge);
      });
    } else {
      console.log(3);
      console.log("PC");
      Bridge = {
        msgHandler: {},
        init: function () {},
        registerHandler: function () {},
        callHandler: function (func, data, cb) {
          var p = {
            type: func,
            data: data
          };
          if (cb) {
            var uid = Bridge.guid();
            Bridge.msgHandler[uid] = cb;
            p.callback = uid;
          }
          console.log('native call ' + func + ' ' + JSON.stringify(p));
          if(window.parent != window)
            window.parent.postMessage(JSON.stringify(p), '*');
        },
        guid: function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }
      };
      window.addEventListener('message', function  (e) {
        if (e.source != window.parent) return;
        // 说明是vue框架请求的
        if((typeof e.data) == 'object') {
          return;
        }
        var p = JSON.parse(e.data);
        if (p.callback) {
          Bridge.msgHandler[p.callback](p.response);
          delete Bridge.msgHandler[p.callback];
        }
      }, false);
      global.Bridge = Bridge;
      callback(Bridge);
    }
  }
}
