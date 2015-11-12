var locationParsers = {
  'inline': function(payload) { return bodyParser(payload.Body); },
  's3': function(payload) { throw new Error("Not yet implemented"); }
};

var bodyParser = function(body)
{
  if(typeof body === 'string') {
    return safelyParseJson(body) || body;
  } else {
    return body;
  }
}

function safelyParseJson(string) {
  try {
    return JSON.parse(string);
  } catch(err) {
    return null;
  }
}

module.exports = function(payload)
{
  if(typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch(err) {
      return Promise.reject(err);
    }
  }

  var parser = locationParsers[payload.Location];
  return Promise.resolve(parser(payload));
};
