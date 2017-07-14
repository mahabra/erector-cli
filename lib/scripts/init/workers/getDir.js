import { cwdSelector } from 'erector/selectors';
import searchLocalErectorDirectories from '../../../helpers/searchLocalErectorDirectories';
import getParentDirs from '__erector__/getParentDirs';

export default function* getDir(state) {
  const cwd = cwdSelector(state);
  const dirs = yield searchLocalErectorDirectories();
  const parents = yield getParentDirs(cwd);
  return {
    dir: dirs[0],
  };
}
