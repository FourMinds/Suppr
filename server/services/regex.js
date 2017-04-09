const regexServerObj = {
  '"': '\\"',
  '\\': '\\\\',
  '_': '\\_'
};

const regexClientObj = {
  '\/"\/': '"',
  '\/\\\/': '\\',
  '\\_': '_'
};

const _replace_regex = (exp, server) =>  server === true ? exp.replace( /"|\\|_/g, matched => regexServerObj[matched]) : exp.replace(/\/"\/|\/\\\/|\\_/g, matched => regexClientObj[matched]);

const _parseData = (obj, server) => {
  if (typeof obj === 'object') {
    for (let prop in obj) {
      if (typeof obj[prop] === 'string') {
        obj[prop] = _replace_regex(obj[prop], server);
        // console.log(obj[prop]);
      } else if (Array.isArray(obj[prop])) {
        _parseData(obj[prop], server);
      } else if (typeof obj[prop] === 'object') {
        _parseData(obj[prop], server);
      }
    }
  }
  return obj;
};

const parseData = (data, server) => {
  if (Array.isArray(data)) {
    data.map(obj => _parseData(obj, server));
  } else if (typeof data === 'object') {
    _parseData(data, server);
  }
  return data;
};

module.exports = {
  parseData: parseData
};