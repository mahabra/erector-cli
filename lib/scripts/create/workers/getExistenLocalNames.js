import getErectorScriptNamesInDirectory from '../../../helpers/getErectorScriptNamesInDirectory';

export default function* getExistenLocalNames({ dir }) {
  return {
    existenNames: getErectorScriptNamesInDirectory(dir),
  };
}
