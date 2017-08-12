import getErectorScriptNamesInDirectory from 'erector-node-utils/getErectorScriptNamesInDirectory';

export default function* getExistenLocalNames({ dir }) {
  return {
    existenNames: getErectorScriptNamesInDirectory(dir),
  };
}
