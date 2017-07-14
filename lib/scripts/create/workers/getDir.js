import { cwdSelector } from 'erector/selectors';
import searchLocalErectorDirectories from '../../../helpers/searchLocalErectorDirectories';

export default function* getDir(state) {
  const dirs = yield searchLocalErectorDirectories(cwdSelector(state));
  return {
    dir: dirs[0],
  };
}
