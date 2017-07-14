const path = require('path');
const erector = require("./../../../erector/dist/app.js");
const args = require('minimist')(process.argv.slice(2));

module.exports = function create() {
  const app = erector();
  app.use(erector.pwd(process.env.PWD || process.cwd()));
  app.run(path.resolve(__dirname, '../scripts/init/index.js'), args)
  .catch(function(e) {
    throw e;
  });
}
