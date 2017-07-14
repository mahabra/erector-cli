/**
 * Get script/package name via dialog
 */
import { dialog, normalize } from 'erector';

export default function* nameDialog({ existenNames }) {
  return normalize(dialog({
    message: 'Script format',
    type: 'list',
    choices: ['file', 'folder'],
    required: true,
  }), format => ({
    format,
  }));
}
