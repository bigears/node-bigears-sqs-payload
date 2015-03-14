var regionBucket = require('region-bucket')
  , Promise      = require('bluebird')
;

var locationParsers = {
  'inline': function(payload) { return bodyParser(payload.Body); },
  's3': function(payload) { throw new Error("Not yet implemented"); }
};

var bodyParser = function(body)
{
  if(typeof body === 'string') {
    return JSON.parse(body);
  } else {
    return body;
  }
}

module.exports = function(payload)
{
  if(typeof payload === 'string') {
    payload = JSON.parse(payload);
  }

  var parser = locationParsers[payload.Location];
  return Promise.resolve(parser(payload));
};
