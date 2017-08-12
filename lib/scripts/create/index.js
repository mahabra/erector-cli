import { cliapp, echo, getState } from 'erector';

// Workers
import typeDialog from './workers/typeDialog';
import prepareScript from './workers/prepareScript';;
// Validators
import typeValidator from './helpers/typeValidator';
import nameValidator from './helpers/nameValidator';

export default cliapp({
  description: 'Create new erector script/package',
  help: `Usage: erect create <type> <name> [-f]

where:
  <type> (default: "script") can be of one:
    script, package

  <name> is the name of the script/package

  [-f] format of source (only with type script):
    file, folder
`,
  getInitialState(args) {
    return {
      type: args._[1] || 'helper',
      name: args._[2],
      format: args.f || args.format || false,
      dir: args.dir,
    };
  },
  worker: function* ({ type, name, dir, existenNames }) {
    if (!type || typeValidator(type) !== true) {
      return typeDialog;
    }
    if (type === 'script') {
      return prepareScript;
    } else {
      yield echo.error('Package type is not supported yet');
      return false;
    }
  }
})
