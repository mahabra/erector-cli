import { echo, readFile, writeFile, createDir, ejs } from 'erector';
import path from 'path';

const templateSrc = path.resolve(__dirname, '../templates/erector-script.js');

function isFormatFile(format) {
  return format === 'file';
}

export default function* generate(state) {
  const { format, type, name, dir } = state;
  const isFile = isFormatFile(format);
  const fullname = isFile
    ? path.join(dir, `${name}.js`)
    : path.join(dir, name, 'index.js');
  if (!isFile) {
    yield createDir(path.dirname(fullname));
  }
  yield writeFile(fullname, ejs(readFile(templateSrc), state));
  yield echo.ok('Created');
  return false;
}
