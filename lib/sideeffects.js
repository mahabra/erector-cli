const ECHO = require('./../../erector').constants.ECHO;
const clc = require('cli-color');

const ECHO_TYPE_DEFAULT = 0;
const ECHO_TYPE_LOG = 1;
const ECHO_TYPE_SUCCESS = 2;
const ECHO_TYPE_ERROR = 3;
const ECHO_TYPE_WARN = 4;
const ECHO_TYPE_NOTE = 5;
const ECHO_TYPE_HEADER = 6;
const ECHO_TYPE_OK = 7;
const ECHO_TYPE_INLINE = 8;
const ECHO_TYPE_CLEAR = 9;

const mapMessageTypeToStyle = {
  [ECHO_TYPE_DEFAULT]: function(s) { return s},
  [ECHO_TYPE_LOG]: clc.xterm(172),
  [ECHO_TYPE_SUCCESS]: clc.xterm(197).bold,
  [ECHO_TYPE_OK]: clc.xterm(197).bold,
  [ECHO_TYPE_ERROR]: clc.xterm(167),
  [ECHO_TYPE_WARN]: clc.xterm(199),
  [ECHO_TYPE_NOTE]: clc.xterm(209),
  [ECHO_TYPE_HEADER]: clc.xterm(167).bold
};

function parseInlineStyles(str) {
  str = str+'';
  const rendered = [];
  let shift = 0;
  let opened = false;
  while (true) {
    const i = str.indexOf('**', shift);
    if (i < 0) {
      break;
    }
    if ( str.charAt(i - 1) !== "\\" ) {
      if (!opened) {
        rendered.push(str.substring(shift, i));
        opened = true;
      } else {
        rendered.push(clc.bold(str.substring(shift, i)));
        opened = false;
      }
    } else {
      rendered.push(str.substring(shift, i - 1) + '**');
    }
    shift = i + 2;
  }
  if (shift < str.length) {
    rendered.push(str.substring(shift, str.length));
  }
  return rendered.join('');
}

module.exports = function sideeffect(action) {
  switch(action.type) {
    case ECHO:
      if (action.messageType === ECHO_TYPE_CLEAR) {
        process.stdout.write('\x1B[2J\x1B[0f');
      } else {
        const messages = (action.message instanceof Array ? action.message : [action.message]);
        const msg = mapMessageTypeToStyle[action.messageType] || function(v) {
          return v;
        };
        const finalMessages = messages.map(function(message) {
          return msg(parseInlineStyles(message));
        });
        if (action.messageType === ECHO_TYPE_INLINE) {
          process.stdout.write(finalMessages.join(' '));
        } else {
          console.log.apply(console, finalMessages);
        }
      }
    break;
  }
}
