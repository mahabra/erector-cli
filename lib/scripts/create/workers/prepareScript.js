import { echo } from 'erector';
import getExistenLocalNames from './getExistenLocalNames';
import getDir from './getDir';
import nameDialog from './nameDialog';
import formatDialog from './formatDialog';
import generateScript from './generateScript';
import nameValidator from '../helpers/nameValidator';

export default function* scriptConfigurator({ name, dir, existenNames, format }) {
  if (!dir) {
    return getDir;
  }
  if (!existenNames) {
    return getExistenLocalNames;
  }
  if (
    !name
    || nameValidator(name) !== true
    || existenNames.includes(name)
  ) {
    yield echo(`**Near scripts base**: ${dir}`);
    return nameDialog;
  }
  if (!format) {
    return formatDialog;
  }
  return generateScript;
}
