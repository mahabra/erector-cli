/* We do not need to have self name */
module.exports = function cutArgsCommands(args) {
  args._ = args._.slice(1);
  return args;
}
