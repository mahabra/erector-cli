/**
 * Get script/package name via dialog
 */
import { dialog, normalize } from 'erector';
import nameValidator from '../helpers/nameValidator';

export default function* nameDialog({ existenNames }) {
  return normalize(dialog({
    message: 'Script name',
    type: 'input',
    validate: (name) => {
      const syntax = nameValidator(name);
      if (syntax !== true) {
        return syntax;
      }
      return !existenNames.includes(name) || `${name} already exists`;
    },
    filter: name => name.toLowerCase(),
    required: true,
  }), name => ({
    name,
  }));
}
