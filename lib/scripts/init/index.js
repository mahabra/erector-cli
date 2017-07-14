import { cliapp } from 'erector';
import getDir from './workers/getDir';

export default cliapp({
  getInitialState() {
    return {
      dir: false,
    };
  },
  worker({ dir }) {
    if (!dir) {
      return getDir;
    }
  }
});
