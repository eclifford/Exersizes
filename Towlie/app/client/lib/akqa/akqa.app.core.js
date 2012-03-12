define(['../lib/akqa/akqa.logger-1.0.0'], function(logger){
  var channels = {};

  return {
    debug: function(on) {
      debug = on ? true : false;
    },

    subscribe: function (channel, subscription) {
      if (!channels[channel]) channels[channel] = [];
      channels[channel].push(subscription);
    },

    publish: function (channel) {
      if (!channels[channel]) return;
      var args = [].slice.call(arguments, 1);
      for (var i = 0, l = channels[channel].length; i < l; i++) {
        channels[channel][i].apply(this, args);
      }
    },

    log: function(severity, message) {
      logger.log(severity, message);
    }
  }
});