import { cwdSelector } from 'erector/selectors';
import searchLocalErectorDirectories from 'erector-node-utils/searchLocalErectorDisposition';

export default function* getDir(state) {
  const dirs = yield searchLocalErectorDirectories(cwdSelector(state));
  return {
    dir: dirs[0],
  };
}
