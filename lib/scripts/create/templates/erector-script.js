import { cliapp, echo } from 'erector';

export default cliapp({
  description: 'This script has no description',
  help: `Usage: erector <%- name %>`,
  getInitialState(args) {
    return {};
  },
  worker: function* () {
    yield echo.ok('Empty script');
    return false;
  }
})
