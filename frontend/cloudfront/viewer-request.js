function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {                       // /about/ -> /about/index.html
    request.uri = uri + 'index.html';
    return request;
  }
  if (uri.split('/').pop().indexOf('.') === -1) { // /about -> 301 /about/
    return { statusCode: 301, statusDescription: 'Moved Permanently',
             headers: { location: { value: uri + '/' } } };
  }
  return request;                                 // assets pass through
}
