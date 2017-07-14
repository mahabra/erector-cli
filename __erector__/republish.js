import { eslint } from 'erector';

export default function* republish(requiredModuleName) {
  const linter = yield eslint(function (context) {
    return {
      "VariableDeclaration": (node) => {
        if (
          node.kind === 'const'
          && node.declarations.length
          && node.declarations[0].id
          && node.declarations[0].id.name === 'erector'
          && node.declarations[0].init
          && node.declarations[0].init.callee
          && node.declarations[0].init.callee.name === 'require'
        ) {
          if (
            node.declarations[0].init.arguments.length
            && node.declarations[0].init.arguments[0].type === 'Literal'
            && node.declarations[0].init.arguments[0].value === requiredModuleName
          ) {
            // ok
          } else {
            context.report({
              node,
              message: `erector must be required from '${requiredModuleName}'`,
              fix: function(fixer) {
                fixer.replaceText(`const erector = require('${requiredModuleName}');`);
              }
            });
          }
        }
      },
    }
  });

  yield linter.lint(['./index.js']);
}
