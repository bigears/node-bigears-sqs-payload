var regionBucket = require('region-bucket')
  , Promise      = require('bluebird')
;

var locationParsers = {
  'inline': function(payload) { return JSON.parse(payload.Body); }
  's3': function(payload) { throw new Error("Not yet implemented"); }
};

module.exports = function(payload)
{
  if(typeof payload === 'string') {
    payload = JSON.parse(payload);
  }

  var parser = locationParsers[payload.Location];
  return Promise.resolve(parser.call(payload));
};
