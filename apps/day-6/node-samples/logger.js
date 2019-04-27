
const name = 'Logger';

function log(message) {
  console.log('log() ->', message);
}

// module.exports = {
//   name: name,
//   log: log
// }

module.exports.name = name;
module.exports.log = log;
